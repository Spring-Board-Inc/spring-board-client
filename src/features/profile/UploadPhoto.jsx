import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import { FaPhotoVideo } from "react-icons/fa"
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useUploadPhotoMutation } from "../api/profileApi";
import { logout } from "../auth/authSlice";

const UploadPhoto = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const goBack = () => {
        navigate('/profile', { replace: true })
    }

    const [uploadPhoto, { isLoading, isSuccess, isError, error }] = useUploadPhotoMutation();
    const [photo, setPhoto] = useState();
    console.log(isError, error)

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
            toast.success('Profile photo successfully updated');
            navigate('/profile', { replace: true })
        }
    })

    const onSubmit = async (e) => {
        e.preventDefault();
       const photoToUpload = new FormData();
       photoToUpload.append('photo', photo);
       const data = { id, photoToUpload };
       await uploadPhoto(data)
    }

  return (
    <Container>
        <Row className='py-5 Main'>
            <Col sm={0} md={2} lg={4}></Col>
                <Col sm={12} md={8} lg={4} className='mt-5'>
                    <Form style={ {boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', padding: '1rem'} } onSubmit={onSubmit}>
                        <h2 className='mt-5 mb-3 text-center RegistrationHeading'>
                            <FaPhotoVideo /> Upload Photo
                        </h2>
                        <Row className="mb-3">
                            <Col lg={12} className='mb-3'>
                                <Form.Group>
                                    <Form.Label className='RegistrationLabel'>Photo</Form.Label>
                                    <Form.Control 
                                        type="file"
                                        required      
                                        id="photoToUpload"
                                        name="phototoUpload"
                                        accept=".png, .jpg, .jpeg"
                                        onChange={(e) => setPhoto(e.target.files[0])}
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
                                            <Button type="submit" className='RegistrationButton mb-1' style={{ backgroundColor: '#212121', border: 'none'}} disabled>Uploading</Button> :
                                            <Button type="submit" className='RegistrationButton mb-1' >Upload</Button>
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

export default UploadPhoto