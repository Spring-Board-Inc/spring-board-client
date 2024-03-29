import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { FaEdit } from 'react-icons/fa'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetAboutByIdQuery, useUpdateAboutMutation } from '../api/aboutApi';
import { logout } from '../auth/authSlice';
import { toast } from 'react-toastify';

const EditAbout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const goBack = () => navigate(-1)
  const { id } = useParams();

  const { data } = useGetAboutByIdQuery(id);
  const [updateAbout, { isLoading, isSuccess, isError, error }] = useUpdateAboutMutation();

  const [formData, setFormData] = useState({
    about: data?.About,
    mission: data?.Mission,
    vision: data?.Vision
  })

  const { about, mission, vision } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const [validated, setValidated] = useState(false);

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
          navigate('/admin/about', { replace: true })
      }
  }, [isSuccess, navigate])

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    e.preventDefault();

    const data = { id, formData}
    await updateAbout(data)
  };
  
  return (
    <Row>
      <Col sm={0} md={1} lg={2}></Col>
        <Col sm={12} md={10} lg={8}>
            <Card className='mt-3'>
                <Form className='p-3' noValidate validated={validated} onSubmit={handleSubmit}>
                  <h4 className='mt-5 mb-3 text-center RegistrationHeading'>
                        <FaEdit /> Edit About
                  </h4>
                  <Row className="mb-1">
                    <Form.Group as={Col} className='mb-2'>
                      <Form.Label>About Summary</Form.Label>
                      <Form.Control
                        required
                        as="textarea"
                        rows={3}
                        id="about"
                        name="about"
                        value={about}
                        onChange={onChange}
                      />
                      <Form.Control.Feedback type="invalid">About Summary is required!</Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row className="mb-1">
                    <Form.Group as={Col} className='mb-2'>
                      <Form.Label>Mission</Form.Label>
                      <Form.Control
                        required
                        as="textarea"
                        rows={3}
                        id="mission"
                        name="mission"
                        value={mission}
                        onChange={onChange}
                      />
                      <Form.Control.Feedback type="invalid">Mission Statement is required!</Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row className="mb-1">
                    <Form.Group as={Col} className='mb-2'>
                      <Form.Label>Vision</Form.Label>
                      <Form.Control
                        required
                        as="textarea"
                        rows={3}
                        id="vision"
                        name="vision"
                        value={vision}
                        onChange={onChange}
                      />
                      <Form.Control.Feedback type="invalid">Vision Statement is required!</Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Col sm={12} md={6} className=''>
                          { isLoading ?
                            <Button variant='secondary' className='BackButton' disabled>Back</Button> :
                            <Button variant='secondary' className='BackButton' onClick={goBack}>Back</Button>
                          }
                      </Col>
                      <Col sm={12} md={6} className='mb-3'>
                          { isLoading ? 
                              <Button type="submit" className='RegistrationButton' disabled>
                                  Saving...
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

export default EditAbout