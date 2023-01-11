import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaBook } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { useApplyMutation } from "../api/jobApi";
import { logout } from "../auth/authSlice";

const Apply = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const goBack = () => navigate(-1);

    const [apply, { isLoading, isSuccess, isError, error }] = useApplyMutation();
    const [cv, setCv] = useState();

    useEffect(() => {
        if(isError){
            if(error?.status === 401){
                dispatch(logout())
                toast.error('Please re-authenticate to continue');
                navigate('/login', { replace: true })
            } else {
                toast.error(error?.data?.Message)
            }
        }
    }, [dispatch, error, navigate, isError])

    useEffect(() => {
        if(isSuccess){
            toast.success('Job application successfully sent.');
            navigate('/', { replace: true })
        }
    }, [isSuccess, navigate])

    const onSubmit = async (e) => {
        e.preventDefault();
       const cvToUpload = new FormData();
       cvToUpload.append('cv', cv);
       const data = { id, cvToUpload };
       await apply(data)
    }

  return (
    <Container>
        <Row className='py-5 Main'>
            <Col sm={0} md={2} lg={4}></Col>
                <Col sm={12} md={8} lg={4} className='mt-5'>
                    <Form style={ {boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', padding: '1rem'} } onSubmit={onSubmit}>
                        <h2 className='mt-5 mb-3 text-center RegistrationHeading'>
                            <FaBook /> Send Application
                        </h2>
                        <Row className="mb-3">
                            <Col lg={12} className='mb-3'>
                                <Form.Group>
                                    <Form.Label className='RegistrationLabel'>Photo</Form.Label>
                                    <Form.Control 
                                        type="file"
                                        required      
                                        id="cvToUpload"
                                        name="cvToUpload"
                                        accept=".pdf, .doc, .docx"
                                        onChange={(e) => setCv(e.target.files[0])}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={12}>
                                <Row className="mb-3">
                                    <Col sm={12} md={4} className='d-flex'>
                                        <Button className="BackButton mb-1" onClick={goBack}>Back</Button>
                                    </Col>
                                    <Col sm={12} md={8} className='d-flex'>
                                        { isLoading ? 
                                            <Button type="submit" className='RegistrationButton mb-1' style={{ backgroundColor: '#212121', border: 'none'}} disabled>Processing...</Button> :
                                            <Button type="submit" className='RegistrationButton mb-1' >Send Application</Button>
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

export default Apply