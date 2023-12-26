import { useState, useEffect } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAddExperienceMutation } from "../api/experienceApi";
import { logout } from "../auth/authSlice";
import { toast } from "react-toastify";
import Spinners from "../../components/public/Commons/Spinner";

const AddExperience = () => {
    const { user } = useSelector((state) => state.auth);
    const userInfoId = user?.UserClaims?.UserInfomationId;
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [addExperience, { isLoading, isError, error, isSuccess} ] = useAddExperienceMutation();

    const [formData, setFormData] = useState({
        company: "",
        location: "",
        designation: "",
        startDate: "",
        endDate: "",
        descriptions: ""
      });

    const goBack = () => navigate(-1);

    const { 
            company,
            location,
            designation,
            startDate,
            endDate,
            descriptions
    } = formData;

    useEffect(() => {
        if(isError){
            if(error?.status === 401){
                dispatch(logout())
                toast.error('Please re-authenticate to continue')
                navigate('/login', { replace: true })
            } else if(error?.status === 403){
                navigate('/unauthorized', { replace: true })
            } else {
                toast.error(error?.data?.Message)
            }
        }
    }, [navigate, error, isError, dispatch])

    useEffect(() => {
        if(isSuccess){
            toast.success('Record successfully added.');
            navigate('/info/experience', { replace: true })
        }
    }, [isSuccess, navigate])

    const onSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            userInfoId,
            company,
            designation,
            location,
            descriptions,
            startDate,
            endDate
        }
        await addExperience(userData);
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
                        <FaPlus /> Add Experience
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
                            <Form.Group as={Col} className='mb-2'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    required
                                    as='textarea'
                                    rows={5}
                                    id="descriptions"
                                    name="descriptions"
                                    value={descriptions}
                                    onChange={onChange}
                                    placeholder='Write the job descriptions'
                                />
                                <Form.Control.Feedback type="invalid">Description is required!</Form.Control.Feedback>
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

export default AddExperience