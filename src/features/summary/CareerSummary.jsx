import React, { useEffect, useState } from 'react'
import { Button, Card, Row } from 'react-bootstrap'
import { FaArrowLeft, FaEdit, FaTrashAlt } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDeleteSummaryMutation } from '../api/careerSummaryApi'
import { logout } from '../auth/authSlice'

const CareerSummary = ({ summary }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goBack = () => navigate(-1)
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const [deleteSummary, { isSuccess, isLoading: isDelLoading, isError: isDelError, error: delError }] = useDeleteSummaryMutation();

  const clearCacheData = () => {
        caches.keys().then((names) => {
            names.forEach((name) => {
                caches.delete(name);
            });
        });
    }

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
        clearCacheData();
        navigate('/info/summary', { replace: true })
    }
    }, [isSuccess, navigate])

    const onDelete = async () => {
        await deleteSummary(summary?.Id);
    }

  return (
    <Row>
        <Card className='mt-3'>
            <Card.Body>
                <Card.Text>{summary?.CareerSummary}</Card.Text>
                <Card.Text>
                    <div className="Border mb-2 w-100"></div>
                    <Link to={`edit/${summary?.UserId}`} style={{float: 'right'}}>
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
                </Card.Text>
            </Card.Body>
        </Card>
    </Row>
  )
}

export default CareerSummary