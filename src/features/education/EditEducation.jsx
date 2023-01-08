import { Row, Col, Form, Button, Card } from "react-bootstrap";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import Spinners from "../../components/public/Commons/Spinner";
import { EDUCATION_LEVEL_ARR } from "../../helpers/Helpers";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useEditEducationMutation, useGetEducationQuery } from "../api/educationApi";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../auth/authSlice";
import {} from 'date-fns';
import { yyyyMmDd } from "../../helpers/Helpers";

const EditEducation = () => {
  const { id } = useParams();
  let { data: education } = useGetEducationQuery(id);

  const [formData, setFormData] = useState({
    school: education?.School,
    city: education?.City,
    course: education?.Course,
    country: education?.Country,
    startDate: yyyyMmDd(education.StartDate),
    endDate: yyyyMmDd(education.EndDate),
    levelOfEducation: education?.LevelOfEducation
});

const { school, city, course, startDate, endDate,country, levelOfEducation } = formData;
const navigate = useNavigate();

const levels = {
  0: 'Basic',
  1: 'Post Basic',
  2: 'Diploma',
  3: 'Bachelor Degree',
  4: 'Master Degree',
  5: 'Ph.D'
}

const goBack = () => navigate(-1);
const[level, setLevel] = useState(levels[education?.Level])

const onChange = (e) => {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.name] : e.target.value,
    }))
}

const [editEducation, { isLoading, isError, isSuccess, error }] = useEditEducationMutation();
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
      navigate(`/info/education`, { replace: true })
  }
}, [isSuccess, navigate, id])

useEffect(() => {
  const levels = {
      'Basic': 0,
      'Post Basic': 1,
      'Diploma': 2,
      'Bachelor Degree': 3,
      'Master Degree': 4,
      'Ph.D': 5
  }
  
  setLevel(levels[levelOfEducation])
}, [levelOfEducation])

const onSubmit = async (e) => {
  e.preventDefault();
  const userData = {
      id,
      school,
      city,
      country,
      level,
      course,
      startDate,
      endDate
  }
  await editEducation(userData);
}

  return (
    <Row>
        <Col sm={0} md={1} lg={2}></Col>
        <Col sm={12} md={10} lg={8}>
            <Card className='mt-3'>
                <Form className='p-3'  onSubmit={onSubmit}>
                    <h4 className='mt-5 mb-3 text-center RegistrationHeading'>
                        <FaEdit /> Edit Qualification
                    </h4>
                    <Row className="mb-3">
                        <Col lg={12} className='mb-3'>
                            <Form.Group>
                                <Form.Label className='RegistrationLabel'>School</Form.Label>
                                <Form.Control 
                                    type="text"
                                    required      
                                    id="school"
                                    name="school"
                                    value={school}
                                    onChange={onChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={12} className='mb-1'>
                            <Form.Group>
                                <Form.Label className='RegistrationLabel'>Course</Form.Label>
                                <Form.Control 
                                    type="text"   
                                    id="course"
                                    name="course"
                                    value={course}
                                    onChange={onChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col sm={12} md={6} className='mb-1'>
                            <Form.Group>
                                <Form.Label className='RegistrationLabel'>City</Form.Label>
                                <Form.Control 
                                    type="text"   
                                    id="city"
                                    name="city"
                                    value={city}
                                    onChange={onChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={6} className='mb-1 mt-4'>
                            <Form.Group>
                                <Form.Select
                                    required
                                    id="country"
                                    name="country"
                                    value={country}
                                    onChange={onChange}
                                >
                                    <option>Select Country</option>
                                    <option>Nigeria</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col sm={12} md={6} className='mb-4'>
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
                        <Col sm={12} md={6} className='mb-4'>
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
                        <Col sm={12} md={6} className='mb-4'>
                            <Form.Group>
                                <Form.Select
                                    required
                                    id="levelOfEducation"
                                    name="levelOfEducation"
                                    value={levelOfEducation}
                                    onChange={onChange}
                                >
                                    <option>Level of Education</option>
                                    { EDUCATION_LEVEL_ARR && EDUCATION_LEVEL_ARR.map(level => (
                                        <option key={level}>{level}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={6} className='mb-1'>
                            <Row>
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

export default EditEducation