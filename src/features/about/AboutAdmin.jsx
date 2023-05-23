import React from 'react'
import { Card, Container, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaPlusSquare } from 'react-icons/fa';
import SingleCardSkeleton from '../../components/public/Commons/skeletons/SingleCardSkeleton';
import { useGetAboutQuery } from '../api/aboutApi';
import Alerts from '../../components/public/Commons/Alerts';

const AboutAdmin = () => {
  const { data: about, isLoading } = useGetAboutQuery();

  return (
    <Container fluid className='mt-3'>
        { !about ?
            <>
                <Row className="d-flex mb-4 mx-3">
                    <Link to={`/admin/about/add`} style={{float: 'right', fontSize: '1.5rem'}}>
                        <FaPlusSquare color="#212121"/>
                    </Link>
                </Row>
                <Row>
                    <Alerts
                        heading={`No About Us Record`} 
                        body={`Please refresh the page if you feel this is an error or check back later.`} 
                    />
                </Row>
            </> :
            isLoading ?
            <SingleCardSkeleton height='15rem' /> :
            <Link to={`${about?.Id}`} className='DeLink'>
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
                            <Link to={`${about?.Id}`} style={{float: 'right'}} className='mx-3'>Modify</Link>
                        </ListGroup.Item>
                    </Card.Header>
                </Card>
            </Link>
        }
    </Container>
  )
}

export default AboutAdmin