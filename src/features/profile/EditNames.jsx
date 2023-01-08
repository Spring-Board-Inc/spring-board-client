import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaUserEdit } from "react-icons/fa";
import Spinners from "../../components/public/Commons/Spinner";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEditNamesMutation, useGetUserProfileQuery } from "../api/profileApi";

const EditNames = () => {
    const { user } = useSelector((state) => state.auth);
    const { id } = useParams();

    const { data: profile, isError: isProfileError, error: profileError } = useGetUserProfileQuery(id);
    const [editNames, { data, isLoading, isSuccess, isError, error }] = useEditNamesMutation()

    const [formData, setFormData] = useState({
        firstName: profile?.FirstName,
        lastName: profile?.LastName
    });
    const { firstName, lastName } = formData;
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value,
        }))
    }

    useEffect(() => {
        if(isProfileError || isError){
            if(profileError?.status === 401 || 
                error?.status === 401){
                navigate('/login', { replace: true })
            }

            if(profileError?.status === 403 || error?.status === 403){
                navigate('/unauthorized', { replace: true })
            }
        }

        if(isSuccess || data){
            toast.success('Names successfully updated.');
            navigate('/profile', { replace: true })
        }
    }, [navigate, isProfileError, profileError, error, isError, data, isSuccess])
    
    const onSubmit = async (e) => {
        e.preventDefault();
        const data = { id, firstName, lastName }
        if(user?.AccessToken){
           await editNames(data);
        }
    }

  return (
    <Container>
        <Row className='py-5 Main'>
            <Col sm={0} md={2} lg={4}></Col>
                <Col sm={12} md={8} lg={4}>
                    <Form style={ {boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', padding: '1rem'} } onSubmit={onSubmit}>
                        <h2 className='mt-5 mb-3 text-center RegistrationHeading'>
                            <FaUserEdit /> Edit Names
                        </h2>
                        <Row className="mb-3">
                            <Col lg={12} className='mb-3'>
                                <Form.Group>
                                    <Form.Label className='RegistrationLabel'>First Name</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        autoComplete="off"
                                        required      
                                        id="firstname"
                                        name="firstName"
                                        value={firstName}
                                        onChange={onChange}
                                        placeholder="Jane"/>
                                </Form.Group>
                            </Col>
                            <Col lg={12} className='mb-3'>
                                <Form.Group>
                                    <Form.Label className='RegistrationLabel'>Last Name</Form.Label>
                                    <Form.Control 
                                        type="text"   
                                        id="lastname"
                                        name="lastName"
                                        value={lastName}
                                        onChange={onChange}
                                        required
                                        placeholder="Doe"/>
                                </Form.Group>
                            </Col>
                            <Col lg={12} className='d-flex'>
                                <Button className="btn-secondary w-50 m-1" onClick={goBack}>Back</Button>
                                { isLoading ? 
                                    <Button type="submit" className='RegistrationButton w-50 m-1' disabled>
                                        <Spinners />
                                    </Button> :
                                    <Button type="submit" className='RegistrationButton w-50 m-1'>Save</Button>
                                }
                            </Col>
                        </Row>
                    </Form>
                </Col>
            <Col sm={0} md={2} lg={4}></Col>
        </Row>
    </Container>
  )
}

export default EditNames