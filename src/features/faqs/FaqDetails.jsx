import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDeleteFaqMutation, useGetFaqQuery } from '../api/faqApi';
import { useEffect } from 'react';
import { logout } from '../auth/authSlice';
import { toast } from 'react-toastify';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import SingleCardSkeleton from '../../components/public/Commons/skeletons/SingleCardSkeleton';
import { FaArrowLeft, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { shortDateTime, shortLocalTime } from '../../helpers/Helpers';

const FaqDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const goBack = () => navigate(-1)
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const { data: faq, isLoading, isError, error } = useGetFaqQuery(id)
  const [deleteFaq, { isLoading: isDelLoading, isSuccess, isError: isDelError, error: delError }] = useDeleteFaqMutation()

  useEffect( () => {
    if(isError){
        if(error?.status === 401){
            dispatch(logout())
            navigate('/login', { replace: true });
            toast.error('Please re-authenticate to continue');
        }
        toast.error(error?.data?.Message);
    }
 }, [isError, error, navigate, dispatch])

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
        navigate('/admin/faqs', { replace: true })
    }
 }, [isSuccess, navigate])

 const onDelete = async () => {
    await deleteFaq(id);
 }
  return (
    <Row>
        <Col sm={0} md={2} lg={3}></Col>
        <Col sm={12} md={8} lg={6}>
            {
                isLoading ?
                <SingleCardSkeleton height='10rem'/> :
                <Card className="mb-2">
                    <Card.Header className='JobCardHeader'>
                        <Card.Title>{faq?.Question}</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                {faq?.Answer}
                            </ListGroup.Item>
                            <ListGroup.Item className="text-muted">Created: {shortDateTime(faq?.CreatedAt)}, {shortLocalTime(faq?.CreatedAt)}</ListGroup.Item>
                            <ListGroup.Item className="text-muted">Updated: {shortDateTime(faq?.UpdatedAt)}, {shortLocalTime(faq?.UpdatedAt)}</ListGroup.Item>
                            <ListGroup.Item>
                                <Link to={`edit`} style={{float: 'right'}}>
                                    <FaEdit color='#212121' size={20}/>
                                </Link>
                                { !show ?
                                        <>
                                        <Button className="DeButton px-3" style={{float: 'right'}} onClick={handleShow}>
                                            <FaTrashAlt color="red" size={20}/>
                                        </Button></> :
                                        <>
                                            { isDelLoading ?
                                            <Button className="mx-3 btn-danger" style={{float: 'right'}} disabled>Deleting...</Button> :
                                            <Button className="mx-3 btn-danger" style={{float: 'right'}} onClick={onDelete}>Delete</Button>
                                            }
                                        </>
                                    }
                                    <Button className="DeButton" style={{float: 'right'}} onClick={goBack}>
                                        <FaArrowLeft color="gray"/>
                                    </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
            }
      </Col>
      <Col sm={0} md={2} lg={3}></Col>
    </Row>
  )
}

export default FaqDetails