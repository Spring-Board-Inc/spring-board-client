import { useEffect, useState } from "react";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinners from "../../components/public/Commons/Spinner";
import { yyyyMmDd } from "../../helpers/Helpers";
import { useEditCertificationMutation, useGetCertificationQuery } from "../api/certificationApi";
import { logout } from "../auth/authSlice";

const EditCertification = () => {
  const { id } = useParams();
  let { data: certification } = useGetCertificationQuery(id);

  const [formData, setFormData] = useState({
    name: certification?.Name,
    issuingBody: certification?.IssuingBody,
    issuingDate: yyyyMmDd(certification?.IssuingDate)
});

const { name, issuingBody, issuingDate } = formData;
const navigate = useNavigate();
const goBack = () => navigate(-1);

const onChange = (e) => {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.name] : e.target.value,
    }))
}

const [editEducation, { isLoading, isError, isSuccess, error }] = useEditCertificationMutation();
const dispatch = useDispatch();

useEffect(() => {
  if(isError){
      if(error?.status === 401){
          dispatch(logout())
          toast.error('Please re-authenticate to continue')
          navigate('/login', { replace: true })
      } else {
          toast.error(error?.data?.Message)
      }
  }
}, [navigate, error, isError, dispatch])

useEffect(() => {
  if(isSuccess){
      toast.success('Record successfully updated.');
      navigate(`/info/certification`, { replace: true })
  }
}, [isSuccess, navigate, id])

const onSubmit = async (e) => {
  e.preventDefault();
  const userData = {
      id,
      name,
      issuingBody,
      issuingDate
  }
  await editEducation(userData);
}

  return (
    <Row>
        <Col sm={0} md={1} lg={2}></Col>
        <Col sm={12} md={10} lg={8}>
            <Card className='mt-3'>
                <Form className='p-3' onSubmit={onSubmit}>
                    <h4 className='mt-5 mb-3 text-center RegistrationHeading'>
                        <FaPlus /> Edit Certification
                    </h4>
                    <Row className="mb-3">
                        <Col lg={12} className='mb-3'>
                            <Form.Group>
                                <Form.Label className='RegistrationLabel'>Certification</Form.Label>
                                <Form.Control 
                                    type="text"
                                    required      
                                    id="name"
                                    name="name"
                                    value={name}
                                    onChange={onChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={12} className='mb-1'>
                            <Form.Group>
                                <Form.Label className='RegistrationLabel'>Issuing Body</Form.Label>
                                <Form.Control 
                                    type="text"   
                                    id="issuingBody"
                                    name="issuingBody"
                                    value={issuingBody}
                                    onChange={onChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col sm={12} md={6} className=''>
                            <Form.Group>
                                <Form.Label className='RegistrationLabel'>Issuing Date</Form.Label>
                                <Form.Control 
                                    type="date"   
                                    id="issuingDate"
                                    name="issuingDate"
                                    value={issuingDate}
                                    onChange={onChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={6} className='mt-4'>
                            <Row className="">
                                <Col sm={12} md={3} className='mb-3'>
                                    <Button variant='secondary' className='DeButton' onClick={goBack}>
                                      <FaArrowLeft color="gray"/>
                                    </Button>
                                </Col>
                                <Col sm={12} md={9}>
                                    { isLoading ? 
                                        <Button type="submit" className='RegistrationButton' disabled>
                                            <Spinners />
                                        </Button> :
                                        <Button type="submit" className='RegistrationButton'>Save</Button>
                                    }
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Col>
        <Col sm={0} md={1} lg={2}></Col>
    </Row>
  )
}

export default EditCertification