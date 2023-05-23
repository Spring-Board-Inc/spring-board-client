import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FaSignInAlt } from 'react-icons/fa';
import Spinners from '../../components/public/Commons/Spinner';
import '../../App.css';
import { useLoginMutation } from '../api/authApi';
import { setAuth } from './authSlice';

const Login = () => {
    const [login, { data: user, isLoading, isSuccess, isError, error } ] = useLoginMutation();
    const [rememberMe, setRememberMe] = useState(false);
    const [code, setCode] = useState(200);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    useEffect(() => {
        if(isError){
            setCode(error?.status)
            toast.error(error?.data?.Message)
        }

        if(isSuccess || user){
            toast.success("Login successful");
            dispatch(setAuth(user))
            navigate(from, { replace: true });
        }

    }, [user, isError, isSuccess, error, navigate, from, dispatch]);
    
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value,
        }))
    }

    const rememberMeHandler = () => {
        setRememberMe(!rememberMe)
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            email,
            password,
            rememberMe
        }
        await login(userData);
    }

  return (
    <Container>
        <Row className='py-5 Main'>
            <Col sm={0} md={2} lg={4}></Col>
                <Col sm={12} md={8} lg={4}>
                    <Form style={ {boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', padding: '1rem'} } onSubmit={onSubmit}>
                        <h2 className='mt-5 mb-3 text-center RegistrationHeading'>
                            <FaSignInAlt /> Sign in
                        </h2>
                        <Row className="mb-3">
                            <Col lg={12} className='mb-3'>
                                <Form.Group>
                                    <Form.Label className='RegistrationLabel'>Email</Form.Label>
                                    <Form.Control 
                                        type="email"
                                        autoComplete="off"
                                        required      
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={onChange}
                                        placeholder="abc@email.com"/>
                                </Form.Group>
                            </Col>
                            <Col lg={12} className='mb-3'>
                                <Form.Group>
                                    <Form.Label className='RegistrationLabel'>Password</Form.Label>
                                    <Form.Control 
                                        type="password"   
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={onChange}
                                        required
                                        placeholder="Password"/>
                                </Form.Group>
                            </Col>
                            <Form.Group className="mb-3">
                                <Form.Check 
                                    type="checkbox"
                                    id="rememberMe"
                                    name="rememberMe"
                                    checked={rememberMe}
                                    onChange={rememberMeHandler}
                                    label="Remember me" />
                            </Form.Group>
                            <Col lg={12}>
                                { isLoading ? 
                                    <Button type="submit" className='RegistrationButton'>
                                        <Spinners />
                                    </Button> :
                                    <Button type="submit" className='RegistrationButton'>Sign In</Button>
                                }
                            </Col>
                        </Row>
                        { 
                            code === 400 ? <p style={ {color: '#fe0000'} }>Forgot password? <Link to="/reset-password">Reset</Link></p> : <p style={ {color: '#212121'} }>Don't have an account? <Link to="/register">Sign up</Link></p>
                        }
                    </Form>
                </Col>
            <Col sm={0} md={2} lg={4}></Col>
        </Row>
    </Container>
  )
}

export default Login