import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row, Form } from 'react-bootstrap'
import { FaEdit } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useEditEmployerMutation, useGetEmployerQuery } from '../api/employerApi'
import { logout } from '../auth/authSlice'

const EditEmployer = () => {
    const { id } = useParams();
    const { data: employer } = useGetEmployerQuery(id)
    const [editEmployer, { isSuccess, isError, error, isLoading }] = useEditEmployerMutation();

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [logo, setLogo] = useState();

    const [formData, setFormData] = useState({
        name: employer?.Name,
        email: employer?.Email
    })

    const goBack = () => navigate(-1)

    const { name, email } = formData;

    useEffect(() => {
        if(isError){
            if(error?.status === 401){
                toast.error('Please re-authenticate to continue')
                dispatch(logout())
                navigate('/login', { replace: true })
            } else if(error?.originalStatus === 500){
                toast.error('Internal or Cloudinary server error')
            } else {
                toast.error('Something went wrong while trying to save your changes, please try again.')
            }
        }
    }, [dispatch, error, isError, navigate])

    useEffect(() => {
        if(isSuccess){
            toast.success('Record updated successfully');
            navigate('/employer/profile', { replace: true })
        }
    })

    const onSubmit = async (e) => {
        e.preventDefault();
       const request = new FormData();
       request.append('name', name);
       request.append('email', email);
       request.append('logo', logo);
       const data = { id, request }
       await editEmployer(data)
    }

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: [e.target.value]
        }))
    }

  return (
    <Row>
        <Col sm={0} md={2} lg={3}></Col>
        <Col sm={12} md={8} lg={6}>
            <Card className='mt-3'>
                <Form className='p-3' onSubmit={onSubmit}>
                    <h4 className='mt-5 mb-3 text-center RegistrationHeading'>
                        <FaEdit /> Edit Company
                    </h4>
                    <Row className="mb-3">
                        <Col lg={12} className='mb-3'>
                            <Form.Group>
                                <Form.Label className='RegistrationLabel mb-1'>Company Name</Form.Label>
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
                        <Col lg={12} className='mb-3'>
                            <Form.Group>
                                <Form.Label className='RegistrationLabel mb-1'>Company Email</Form.Label>
                                <Form.Control 
                                    type="email"
                                    required      
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={onChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={12} className='mb-1'>
                            <Form.Group>
                                <Form.Label className='RegistrationLabel mb-1'>Company Logo</Form.Label>
                                <Form.Control 
                                    type="file"
                                    required      
                                    id="logo"
                                    name="logo"
                                    accept=".png, .jpg, .jpeg"
                                    onChange={(e) => setLogo(e.target.files[0])}
                                />
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

export default EditEmployer