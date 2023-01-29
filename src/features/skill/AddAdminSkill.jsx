import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { FaPlus } from 'react-icons/fa'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAddSkillMutation } from '../api/skillApi';
import { logout } from '../auth/authSlice';

const AddAdminSkill = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const goBack = () => navigate(-1)

  const [AddSkill, { isSuccess, isLoading, isError, error }] = useAddSkillMutation()
  const [formData, setFormData] = useState({
    description: ''
  })

  const { description } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  useEffect(() => {
    if(isError){
        if(error?.status === 401){
            dispatch(logout())
            toast.error('Please re-authenticate to continue')
            navigate('/login', { replace: true })
        }
    }
  }, [navigate, error, isError, dispatch])

  useEffect(() => {
    if(isSuccess){
        toast.success('Record successfully added.');
        navigate('/admin/skill', { replace: true })
    }
  }, [isSuccess, navigate])

  const [validated, setValidated] = useState(false);
  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    e.preventDefault()
    await AddSkill(formData)
  };

  return (
    <Row>
        <Col sm={0} md={2} lg={3}></Col>
        <Col sm={12} md={8} lg={6}>
            <Card className='mt-3'>
                <Form className='p-3' noValidate validated={validated} onSubmit={handleSubmit}>
                  <h4 className='mt-5 mb-3 text-center RegistrationHeading'>
                        <FaPlus /> Add Skill
                  </h4>
                  <Row className="mb-1">
                    <Form.Group as={Col} className='mb-2'>
                      <Form.Label>Skill</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        id="description"
                        name="description"
                        value={description}
                        onChange={onChange}
                      />
                      <Form.Control.Feedback type="invalid">Skill is required!</Form.Control.Feedback>
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
                                    Loading...
                                </Button> :
                                <Button type="submit" className='RegistrationButton'>Save</Button>
                            }
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Col>
        <Col sm={0} md={2} lg={3}></Col>
    </Row>
  )
}

export default AddAdminSkill