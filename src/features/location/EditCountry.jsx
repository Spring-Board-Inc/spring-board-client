import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { FaEdit } from 'react-icons/fa'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEditCountryMutation, useGetCountryQuery } from '../api/countryApi';
import { logout } from '../auth/authSlice';

const EditCountry = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const goBack = () => navigate(-1)
  const { id } = useParams();

  const {data: country, isError: isGetError, error: getError } = useGetCountryQuery(id);
  const [editCountry, { isSuccess, isLoading, isError, error }] = useEditCountryMutation();

  const [formData, setFormData] = useState({
    name: country?.Name
  })

  const { name } = formData;

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
    if(isGetError){
        if(getError?.status === 401){
            dispatch(logout())
            toast.error('Please re-authenticate to continue')
            navigate('/login', { replace: true })
        } else {
            toast.error(getError?.data?.Message)
        }
    }
  }, [navigate, getError, isGetError, dispatch])
  
  useEffect(() => {
    if(isSuccess){
        toast.success('Record successfully updated.');
        navigate(`/admin/location/country`, { replace: true })
    }
  }, [isSuccess, navigate, id])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const [validated, setValidated] = useState(false);

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    e.preventDefault()
    const data = { id, name }
    await editCountry(data);
  };

  return (
    <Row>
        <Col sm={0} md={2} lg={3}></Col>
        <Col sm={12} md={8} lg={6}>
            <Card className='mt-3'>
                <Form className='p-3' noValidate validated={validated} onSubmit={handleSubmit}>
                  <h4 className='mt-5 mb-3 text-center RegistrationHeading'>
                        <FaEdit /> Edit Country
                  </h4>
                  <Row className="mb-1">
                    <Form.Group as={Col} className='mb-2'>
                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={onChange}
                      />
                      <Form.Control.Feedback type="invalid">Country is required!</Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                    <Row className="mb-3">
                        <Col sm={12} md={6} className=''>
                            <Button variant='secondary' className='BackButton' onClick={goBack}>Back</Button>
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

export default EditCountry