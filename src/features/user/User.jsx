import { useEffect } from 'react';
import { Button, Image, ListGroup, Row, Col } from 'react-bootstrap';
import { FaMars, FaVenus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { shortDateTime, shortLocalTime } from '../../helpers/Helpers';
import { DUMMY_USER_PHOTO } from '../../helpers/Helpers';
import { useReactivateMutation, useSuspendMutation } from '../api/userApi';
import { logout } from '../auth/authSlice';

const User = ({ user }) => {
    const auth = useSelector((state) => state.auth);
    const loggedInUserId = auth?.user?.UserClaims?.UserId;
    const photo = user?.PhotoUrl ? user?.PhotoUrl : DUMMY_USER_PHOTO;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [reactivate, { isLoading: isReactivateLoading, isError: isReactError, error: reactError }] = useReactivateMutation();
    const [suspend, { isLoading: isDeactivateLoading, isError: isDeactError, error: deactError  }] = useSuspendMutation();

    useEffect( () => {
        if(isReactError){
            if(reactError?.status === 401){
                dispatch(logout())
                navigate('/login', { replace: true });
                toast.error('Please re-authenticate to continue');
            }
            toast.error(reactError?.data?.Message);
        }
     }, [isReactError, reactError, navigate, dispatch])
    
     useEffect( () => {
        if(isDeactError){
            if(deactError?.status === 401){
                dispatch(logout())
                navigate('/login', { replace: true });
                toast.error('Please re-authenticate to continue');
            }
            toast.error(deactError?.data?.Message);
        }
     }, [isDeactError, deactError, navigate, dispatch])
    
    const onDeactivate = async() => {
        await suspend(user?.Id)
    }

    const onReactivate = async() => {
        await reactivate(user?.Id)
    }

  return (
    <Col className='m-1' style={ {boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'} }>
        <Row>
            <Col sm={12} md={4} style={{minHeight: '10rem'}} className=''>
                <Image
                    src= {photo}
                    fluid
                    thumbnail
                    alt="Profile Photo"
                />
            </Col>
            <Col sm={12} md={8} className='fontSize centered'>
                <ListGroup variant="flush">
                    <ListGroup.Item className='bgColor'>{user?.FirstName}</ListGroup.Item>
                    <ListGroup.Item className='bgColor'>{user?.LastName}</ListGroup.Item>
                    <ListGroup.Item className='bgColor'>
                        Gender: { user?.Gender === 'Female' ? <FaVenus color="#F55887"/> : <FaMars color="blue"/> }
                    </ListGroup.Item>
                    <ListGroup.Item className='bgColor'>{user?.Email}</ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
        <Row className='fontSize border-top p-2'>
            <Col>
                <ListGroup variant='flush'>
                    <ListGroup.Item className='bgColor'>Registered: {shortDateTime(user?.CreatedAt)}, {shortLocalTime(user?.CreatedAt)}</ListGroup.Item>
                    <ListGroup.Item className='bgColor'>Last Login: {shortDateTime(user?.LastLogin)}, {shortLocalTime(user?.LastLogin)}</ListGroup.Item>
                    <ListGroup.Item className='bgColor'>Last Updated: {shortDateTime(user?.UpdatedAt)}, {shortLocalTime(user?.UpdatedAt)}</ListGroup.Item>
                    <ListGroup.Item className='bgColor'>
                        { user?.IsActive && !user?.IsDeprecated && user?.Id !== loggedInUserId ? 
                            <Button className="DeButton m-1" style={{float: 'right', color: 'red', textDecoration: 'underline'}} onClick={onDeactivate} disabled={isDeactivateLoading}>Deactivate</Button> :
                                !user?.IsActive && user?.IsDeprecated && user?.Id !== loggedInUserId ?
                            <Button className="DeButton m-1" style={{float: 'right', color: '#212121', textDecoration: 'underline'}} onClick={onReactivate} disabled={isReactivateLoading}>Activate</Button> :
                            <Button className="DeButton m-1" style={{float: 'right', color: '#212121', textDecoration: 'underline'}} disabled>No Action</Button>
                        }
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
    </Col>
  )
}

export default User