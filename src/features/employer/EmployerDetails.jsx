import React from 'react'
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { FaArrowLeft, FaEdit } from 'react-icons/fa'
import { Link, useNavigate, useParams } from 'react-router-dom'
import EmployerDeleteModal from '../../components/private/modals/EmployerDeleteModal'
import SingleCardSkeleton from '../../components/public/Commons/skeletons/SingleCardSkeleton'
import { shortLocalTime } from '../../helpers/Helpers'
import { useGetEmployerQuery } from '../api/employerApi'

const EmployerDetails = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const goBack = () => {
        navigate(-1)
    }

    const { data: employer, isLoading } = useGetEmployerQuery(id);

  return (
    <Row>
        <Col sm={0} md={1} lg={2}></Col>
        <Col sm={12} md={10} lg={8}>
            { isLoading ?
                <SingleCardSkeleton height='10rem'/> :
                <Card className="mt-3">
                    <Card.Header className='JobCardHeader'>
                        <Card.Img src={employer?.LogoUrl} className='JobCardImage'/>
                        <Card.Title>{employer?.Name}</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Email: {employer?.Email}</ListGroup.Item>
                            <ListGroup.Item className="text-muted">Created: {new Date(employer?.CreatedAt).toDateString()}, {shortLocalTime(employer?.CreatedAt)}</ListGroup.Item>
                            <ListGroup.Item className="text-muted">Updated: {new Date(employer?.UpdatedAt).toDateString()}, {shortLocalTime(employer?.UpdatedAt)}</ListGroup.Item>
                            <ListGroup.Item>
                                <Link to={`edit`} style={{float: 'right'}}>
                                    <FaEdit color='#212121' size={20}/>
                                </Link>
                                <EmployerDeleteModal id={employer?.Id}/>
                                <Button className="DeButton" style={{float: 'right'}} onClick={goBack}>
                                    <FaArrowLeft color="#212121" size={20}/>
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
            }
        </Col>
        <Col sm={0} md={1} lg={2}></Col>
    </Row>
  )
}

export default EmployerDetails