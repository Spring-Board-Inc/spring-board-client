import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Spinners from "../../components/public/Commons/Spinner";
import { FaRedoAlt } from 'react-icons/fa';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "../api/authApi";

const ResetPassword = () => {
    const [ resetPassword, { data: pass, isLoading, isError, isSuccess, error } ] = useResetPasswordMutation();
    const [formData, setFormData] = useState({
        email: ''
    });

    const { email } = formData;
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1, { replace: true });
    }

    useEffect(() => {
        if(isError){
            toast.error(error?.data?.Message)
        }

        if(isSuccess || pass){
            toast.success("Success!. Please check your mail to continue.");
            navigate('/', { replace: true });
        }

    }, [pass, isError, isSuccess, error, navigate]);
    
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value,
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email
        }
        await resetPassword(data);
    }

  return (
    <Container>
        <Row className='py-5 Main'>
            <Col sm={0} md={2} lg={4}></Col>
                <Col sm={12} md={8} lg={4} style={ {boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'} }>
                    <h2 className='mt-5 mb-3 text-center RegistrationHeading'>
                        <FaRedoAlt /> Reset Password
                    </h2>
                    <Form onSubmit={onSubmit}>
                        <Row className="mb-3">
                            <Col lg={12} className='mb-3'>
                                <Form.Group>
                                    <Form.Label className='RegistrationLabel'>Email</Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={onChange}
                                        required
                                        autoComplete="off"
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={12}>
                                <Row className="mb-3">
                                    <Col sm={12} md={6} className='d-flex'>
                                        <Button className="BackButton mb-1" onClick={goBack}>Back</Button>
                                    </Col>
                                    <Col sm={12} md={6} className='d-flex'>
                                        { isLoading ? 
                                            <Button type="submit" className='RegistrationButton mb-1' style={{ backgroundColor: '#212121', border: 'none'}} disabled>
                                                <Spinners />
                                            </Button> :
                                            <Button type="submit" className='RegistrationButton mb-1' >Submit</Button>
                                        }
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            <Col sm={0} md={2} lg={4}></Col>
        </Row>
    </Container>
  )
}

export default ResetPassword