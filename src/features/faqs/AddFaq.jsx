import React from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { FaPlusSquare } from 'react-icons/fa'
import { useAddFaqMutation } from '../api/faqApi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { logout } from '../auth/authSlice';
import { toast } from 'react-toastify';

const AddFaq = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const goBack = () => navigate(-1)

  const [addFaq, { isLoading, isSuccess, isError, error }] = useAddFaqMutation();

  const [formData, setFormData] = useState({
    question: '',
    answer: ''
  })

  const { question, answer } = formData;

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
          navigate('/admin/faqs', { replace: true })
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

    const data = { formData }
    await addFaq(data)
  };

  return (
    <Row>
        <Col sm={0} md={1} lg={2}></Col>
        <Col sm={12} md={10} lg={8}>
            <Card className='mt-3'>
                <Form className='p-3' noValidate validated={validated} onSubmit={handleSubmit}>
                  <h4 className='mt-5 mb-3 text-center RegistrationHeading'>
                        <FaPlusSquare /> Edit FAQ
                  </h4>
                  <Row className="mb-1">
                    <Form.Group as={Col} className='mb-2'>
                      <Form.Label>Question</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        id="question"
                        name="question"
                        value={question}
                        onChange={onChange}
                      />
                      <Form.Control.Feedback type="invalid">Question is required!</Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row className="mb-1">
                    <Form.Group as={Col} className='mb-2'>
                      <Form.Label>Answer</Form.Label>
                      <Form.Control
                        required
                        as="textarea"
                        rows={4}
                        id="answer"
                        name="answer"
                        value={answer}
                        onChange={onChange}
                      />
                      <Form.Control.Feedback type="invalid">Answer is required!</Form.Control.Feedback>
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

export default AddFaq