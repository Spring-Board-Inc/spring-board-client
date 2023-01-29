import { Row, Col, Card, Form, Button } from "react-bootstrap";
import Spinners from "../../components/public/Commons/Spinner";
import { FaEdit } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useEditExperienceMutation, useGetExperienceQuery } from "../api/experienceApi";
import { useEffect, useState } from "react";
import { MIN_DATE, yyyyMmDd } from "../../helpers/Helpers";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../auth/authSlice";
import EditorToolbar, { modules, formats } from "../../components/public/Commons/EditorToolbar";
import ReactQuill from "react-quill";

const EditExperience = () => {
  const { id } = useParams();
  let { data: experience } = useGetExperienceQuery(id);

  const [formData, setFormData] = useState({
    company: experience?.Company,
    designation: experience?.Designation,
    location: experience?.Location,
    startDate: yyyyMmDd(experience.StartDate),
    endDate: experience?.EndDate === MIN_DATE? '' : yyyyMmDd(experience.EndDate)
});

const [descriptions, setDescriptions] = useState(experience?.Descriptions)

const { company, designation, location, startDate, endDate } = formData;
const navigate = useNavigate();

const goBack = () => navigate(-1);

const onChange = (e) => {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.name] : e.target.value,
    }))
}

const [editExperience, { isLoading, isError, isSuccess, error }] = useEditExperienceMutation();
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
      navigate(`/info/experience`, { replace: true })
  }
}, [isSuccess, navigate, id])

const onSubmit = async (e) => {
  e.preventDefault();
  const userData = {
      id,
      company,
      designation,
      location,
      descriptions,
      startDate,
      endDate
  }
  await editExperience(userData);
}

const handleChange = value => {
  setDescriptions(value)
};

  return (
    <Row>
        <Col sm={0} md={1} lg={2}></Col>
        <Col sm={12} md={10} lg={8}>
            <Card className='mt-3'>
                <Form className='p-3' onSubmit={onSubmit}>
                    <h4 className='mt-5 mb-3 text-center RegistrationHeading'>
                        <FaEdit /> Edit Experience
                    </h4>
                    <Row className="mb-3">
                        <Col lg={12} className='mb-3'>
                            <Form.Group>
                                <Form.Label className='RegistrationLabel'>Company</Form.Label>
                                <Form.Control 
                                    type="text"
                                    required      
                                    id="company"
                                    name="company"
                                    value={company}
                                    onChange={onChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={12} className='mb-1'>
                            <Form.Group>
                                <Form.Label className='RegistrationLabel'>Designation</Form.Label>
                                <Form.Control 
                                    type="text"
                                    required      
                                    id="designation"
                                    name="designation"
                                    value={designation}
                                    onChange={onChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={12} className='mb-1'>
                            <Form.Group>
                                <Form.Label className='RegistrationLabel'>Location</Form.Label>
                                <Form.Control 
                                    type="text"   
                                    id="location"
                                    name="location"
                                    value={location}
                                    onChange={onChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col sm={12} md={6} className='mb-3'>
                            <Form.Group>
                                <Form.Label className='RegistrationLabel'>Start Date</Form.Label>
                                <Form.Control 
                                    type="date"   
                                    id="startDate"
                                    name="startDate"
                                    value={startDate}
                                    onChange={onChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={6} className='mb-1'>
                            <Form.Group>
                                <Form.Label className='RegistrationLabel'>End Date</Form.Label>
                                <Form.Control 
                                    type="date"   
                                    id="endDate"
                                    name="endDate"
                                    value={endDate}
                                    onChange={onChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col lg={12} className='mb-1'>
                            <Form.Group>
                                <Form.Label className='RegistrationLabel'>Job Description</Form.Label>
                                <div className="text-editor">   
                                    <EditorToolbar />
                                    <ReactQuill
                                        theme="snow"
                                        value={descriptions}
                                        onChange={handleChange}
                                        placeholder={"Job descriptions..."}
                                        modules={modules}
                                        formats={formats}
                                    />
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col sm={12} md={6} className='mb-3'>
                            <Button variant='secondary' className='BackButton' onClick={goBack}>Back</Button>
                        </Col>
                        <Col sm={12} md={6}>
                            { isLoading ? 
                                <Button type="submit" className='RegistrationButton' disabled>
                                    <Spinners />
                                </Button> :
                                <Button type="submit" className='RegistrationButton'>Save</Button>
                            }
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Col>
        <Col sm={0} md={1} lg={2}></Col>
    </Row>
  )
}

export default EditExperience