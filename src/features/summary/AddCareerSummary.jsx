import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { FaPlus } from 'react-icons/fa'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAddSummaryMutation } from '../api/careerSummaryApi';
import { logout } from '../auth/authSlice';

const AddCareerSummary = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
      careerSummary: ''
    })
  
    const [addSummary, { isSuccess, isError, error, isLoading }] = useAddSummaryMutation();
    const { careerSummary } = formData;
  
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
            navigate('/info/summary', { replace: true })
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
    await addSummary(formData);
  };

  return (
    <Row>
        <Col sm={0} md={2} lg={3}></Col>
        <Col sm={12} md={8} lg={6}>
            <Card className='mt-3'>
                <Form className='p-3' noValidate validated={validated} onSubmit={handleSubmit}>
                  <h4 className='mt-5 mb-3 text-center RegistrationHeading'>
                        <FaPlus /> Add Career Summary
                  </h4>
                  <Row className="mb-1">
                    <Form.Group as={Col} className='mb-2'>
                      <Form.Label>Career Summary</Form.Label>
                      <Form.Control
                        required
                        as='textarea'
                        rows={5}
                        id="careerSummary"
                        name="careerSummary"
                        
                        value={careerSummary}
                        onChange={onChange}
                        placeholder='Write something awesome'
                      />
                      <Form.Control.Feedback type="invalid">This field is required!</Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Col sm={12} md={6} className='mb-2'>
                        <Button variant='secondary' className='BackButton' onClick={goBack} disabled={isLoading}>Back</Button>
                    </Col>
                    <Col sm={12} md={6} className='mb-2'>
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
        <Col sm={0} md={2} lg={3}></Col>
    </Row>
  )
}

export default AddCareerSummary