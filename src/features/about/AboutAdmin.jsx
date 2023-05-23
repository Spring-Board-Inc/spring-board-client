import React from 'react'
import { useGetAboutQuery } from '../api/aboutApi'
import { Button, Card, Container, ListGroup, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEdit, FaPlusSquare, FaTrashAlt } from 'react-icons/fa';
import SingleCardSkeleton from '../../components/public/Commons/skeletons/SingleCardSkeleton';
import { useState } from 'react';

const AboutAdmin = () => {
  const { data: about, isLoading } = useGetAboutQuery();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1)
  }

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const onDelete = () => {

  }

  return (
    <Container fluid className='mt-3'>
        { !about ?
            <Row className="d-flex mb-4 mx-3">
                <Link to={`/admin/about/add`} style={{float: 'right', fontSize: '1.5rem'}}>
                    <FaPlusSquare color="#212121"/>
                </Link>
            </Row> :
            <></>
        }
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
                        <Link to={`edit/${about?.Id}`} style={{float: 'right'}} className='mx-3'>
                            <FaEdit color='#212121' size={20}/>
                        </Link>
                        {
                            !show ?
                            <Button className='DeButton mx-3' style={{float: 'right'}} onClick={handleShow}>
                                <FaTrashAlt color='red' size={20}/>
                            </Button> :
                            <Button className="mx-3 btn-danger" style={{float: 'right'}} onClick={onDelete}>Delete</Button>
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

export default AboutAdmin