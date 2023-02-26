import React, { useEffect, useState } from 'react'
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { FaArrowLeft, FaEdit, FaTrashAlt } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import SingleCardSkeleton from '../../components/public/Commons/skeletons/SingleCardSkeleton'
import { shortDateTime, shortLocalTime } from '../../helpers/Helpers'
import { useDeleteIndustryMutation, useGetIndustryQuery } from '../api/industryApi'
import { logout } from '../auth/authSlice'

const IndustryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const goBack = () => navigate(-1)

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const { data: industry, isLoading, isError, error } = useGetIndustryQuery(id)
  const [deleteIndustry, { isLoading: isDelLoading, isSuccess, isError: isDelError, error: delError }] = useDeleteIndustryMutation()

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
        navigate('/admin/industry', { replace: true })
    }
 }, [isSuccess, navigate])

 const onDelete = async () => {
    await deleteIndustry(id);
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
                        <Card.Title>{industry?.Industry}</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <ListGroup variant="flush">
                            <ListGroup.Item className="text-muted">Created: {shortDateTime(industry?.CreatedAt)}, {shortLocalTime(industry?.CreatedAt)}</ListGroup.Item>
                            <ListGroup.Item className="text-muted">Updated: {shortDateTime(industry?.UpdatedAt)}, {shortLocalTime(industry?.UpdatedAt)}</ListGroup.Item>
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

export default IndustryDetails