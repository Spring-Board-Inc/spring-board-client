import { Container, Row, Col, Image, ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEdit } from 'react-icons/fa'
import { useGetUserProfileQuery } from "../api/profileApi";
import { DUMMY_USER_PHOTO } from "../../helpers/Helpers";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { shortDateTime } from "../../helpers/Helpers";
import { shortLocalTime } from "../../helpers/Helpers";
import { logout } from "../auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import ProfileSkeleton from "../../components/public/Commons/skeletons/ProfileSkeleton";
import DeativationModal from "../../components/private/modals/DeativationModal";

const Profile = () => {
    const { user } = useSelector((state) => state.auth);
    const userId = user?.UserClaims?.UserId;
    const { data: profile, isError, isLoading, error } = useGetUserProfileQuery(userId);
    const photoUrl = profile?.PhotoUrl ? profile?.PhotoUrl : DUMMY_USER_PHOTO;
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    useEffect(() => {
        if(isError){
            if(error?.status === 401 || error?.status === 403){
                dispatch(logout());
                toast.info("Please re-authenticate to continue.");
                navigate('/login', { replace: true })
            } else {
                navigate(from, { replace: true });
            }
        }
  }, [error, from, isError, navigate, dispatch]);
  
  return (
    <Container className='py-5'>
      <Row className='mt-5'>
        <Col sm={0} md={2} lg={3}></Col>
          <Col sm={12} md={8} lg={6}>
            <Row>
              <Col>
                <Col className='m-3' style={ {boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'} }>
                  { isLoading ? <ProfileSkeleton /> :
                  <>
                  <Row className='p-2'>
                    <Col sm={12} md={5} style={{minHeight: '10rem'}} className='centered'>
                          <Image
                            src= {photoUrl}
                            fluid
                            thumbnail
                            alt="Profile Photo"
                          />
                    </Col>
                    <Col sm={12} md={7} className='fontSize centered'>
                      <ListGroup variant="flush">
                        <ListGroup.Item className='bgColor'>Registered: {shortDateTime(profile?.CreatedAt)}, {shortLocalTime(profile?.CreatedAt)}</ListGroup.Item>
                        <ListGroup.Item className='bgColor'>Last Login: {shortDateTime(profile?.LastLogin)}, {shortLocalTime(profile?.LastLogin)}</ListGroup.Item>
                        <ListGroup.Item className='bgColor'>Last Updated: {shortDateTime(profile?.UpdatedAt)}, {shortLocalTime(profile?.UpdatedAt)}</ListGroup.Item>
                        <ListGroup.Item className='bgColor'>
                          {/* <Button className='ButtonToLinkDanger' style={{float: 'right'}} onClick={handleDeactivate}>Deactivate Account</Button> */}
                          <DeativationModal id={profile?.Id}/>
                        </ListGroup.Item>
                      </ListGroup>
                    </Col>
                  </Row>
                  <Row className='fontSize border-top p-2'>
                    <Col>
                      <ListGroup variant="flush">
                        <ListGroup.Item className='bgColor'>{profile?.FirstName} {profile?.LastName} 
                            <Link to={`edit-names/${profile?.Id}`} className='EditLink'>
                                <FaEdit />
                            </Link>
                        </ListGroup.Item>
                        <ListGroup.Item className='bgColor'>{profile?.PhoneNumber}</ListGroup.Item>
                        <ListGroup.Item className='bgColor'>{profile?.Email}</ListGroup.Item>
                        <ListGroup.Item className='bgColor'>{profile?.Street}, {profile?.City}. {profile?.State} {profile?.PostalCode}. {profile?.Country} 
                            <Link to={`edit-address/${profile?.Id}`} className='EditLink m-1'>
                                <FaEdit />
                            </Link>
                        </ListGroup.Item>
                      </ListGroup>
                    </Col>
                  </Row>
                  </>}
                </Col>
              </Col>
            </Row>
          </Col>
          <Col sm={0} md={2} lg={3}></Col>   
      </Row>
  </Container>
  )
}

export default Profile