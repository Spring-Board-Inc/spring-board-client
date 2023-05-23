import React, { useEffect, useState } from 'react'
import { Button, Card, Container, ListGroup } from 'react-bootstrap'
import SingleCardSkeleton from '../../components/public/Commons/skeletons/SingleCardSkeleton'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FaArrowLeft, FaEdit, FaTrashAlt } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { useDeprecateAboutMutation, useGetAboutByIdQuery } from '../api/aboutApi'
import { logout } from '../auth/authSlice'
import { toast } from 'react-toastify'

const AboutDetails = () => {
  const { id } = useParams();
  const { data: about, isLoading } = useGetAboutByIdQuery(id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const goBack = () => {
    navigate(-1)
  }
console.log(about)
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [deprecateAbout, { isSuccess, isLoading: isDelLoading, isError: isDelError, error: delError }] = useDeprecateAboutMutation();

  useEffect( () => {
    if(isDelError){
        if(delError?.status === 401){
            dispatch(logout())
            navigate('/login', { replace: true });
            toast.error('Please re-authenticate to continue');
        }
        toast.error(delError?.data?.Message);
        }
}, [isDelError, delError, navigate, dispatch])

useEffect(() => {
    if(isSuccess){
        toast.success('Record successfully deleted.');
        navigate('/admin/about', { replace: true })
    }
 }, [isSuccess, navigate])

 const onDelete = async () => {
    await deprecateAbout(about?.Id);
 }

  return (
    <Container>
        {
            isLoading ?
            <SingleCardSkeleton height='15rem' /> :
            <Card>
                <Card.Header className='JobCardHeader'>
                    <Card.Title>About Us</Card.Title>
                </Card.Header>
                <Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item>{about?.About}</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
                <Card.Header>
                    <Card.Title>Vision</Card.Title>
                </Card.Header>
                <Card.Body>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>{about?.Vision}</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
                <Card.Header>
                    <Card.Title>Mission</Card.Title>
                </Card.Header>
                <Card.Body>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>{about?.Mission}</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
                <Card.Header>
                    <ListGroup.Item>
                        <Link to={`/admin/about/edit/${about?.Id}`} style={{float: 'right'}} className='mx-3'>
                            <FaEdit color='#212121' size={20}/>
                        </Link>
                        {
                            !show ?
                            <Button className='DeButton mx-3' style={{float: 'right'}} onClick={handleShow}>
                                <FaTrashAlt color='red' size={20}/>
                            </Button> :
                            <Button className="mx-3 btn-danger" style={{float: 'right'}} onClick={onDelete} active={isDelLoading}>Delete</Button>
                        }
                        <Button className="DeButton mx-3" style={{float: 'right'}} onClick={goBack}>
                            <FaArrowLeft color="#212121" size={20}/>
                        </Button>
                    </ListGroup.Item>
                </Card.Header>
            </Card>
        }
    </Container>
  )
}

export default AboutDetails