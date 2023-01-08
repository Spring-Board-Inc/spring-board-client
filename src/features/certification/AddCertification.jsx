import { useEffect, useState } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAddCertificationMutation } from "../api/certificationApi";
import { logout } from '../auth/authSlice';
import Spinners from '../../components/public/Commons/Spinner'

const AddCertification = () => {
    const { user } = useSelector((state) => state.auth);
    const userInfoId = user?.UserClaims?.UserInfomationId;
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [addCertification, { isLoading, isError, error, isSuccess} ] = useAddCertificationMutation();

    const [formData, setFormData] = useState({
        name: '',
        issuingBody: '',
        issuingDate: ''
    });

    const goBack = () => navigate(-1);
    
    const { 
        name,
        issuingBody,
        issuingDate
    } = formData;

    useEffect(() => {
        if(isError){
            if(error?.status === 401){
                dispatch(logout())
                toast.error('Please re-authenticate to continue')
                navigate('/login', { replace: true })
            } else if(error?.status === 500 || error?.originalStatus === 500) {
                toast.error('Unexpected error occur. Please try again.')
            } else {
                toast.error(error?.data?.Message)
            }
        }
    }, [navigate, error, isError, dispatch])

    useEffect(() => {
        if(isSuccess){
            toast.success('Record successfully added.');
            navigate('/info/certification', { replace: true })
        }
    }, [isSuccess, navigate])

    const onSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            userInfoId,
            name,
            issuingBody,
            issuingDate
        }
        await addCertification(userData);
    }

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value,
        }))
    }

  return (
    <Row>
        <Col sm={0} md={1} lg={2}></Col>
        <Col sm={12} md={10} lg={8}>
            <Card className='mt-3'>
                <Form className='p-3' onSubmit={onSubmit}>
                    <h4 className='mt-5 mb-3 text-center RegistrationHeading'>
                        <FaPlus /> Add Certification
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

export default AddCertification;