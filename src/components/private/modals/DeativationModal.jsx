import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDeactivateMutation } from '../../../features/api/profileApi';
import { logout } from '../../../features/auth/authSlice';

const DeativationModal = ( { id }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [deactivate, { isSuccess, isError, error } ] = useDeactivateMutation()
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        if(isError){
            if(error?.status === 401){
                toast.error("Re-authenticate to continue")
                setShow(false)
                navigate('/login', { replace: true })
            } else if(error?.status === 403){
                toast.error("You're not authorized to perform this operation")
                setShow(false)
                navigate('/unauthorized', { replace: true })
            } else {
                toast.error('Deactivation failed. Please try again');
                setShow(false);
            }
        }
    }, [error, isError, navigate, dispatch])

    useEffect(() => {
        if(isSuccess){
            navigate('/', { replace: true })
            toast.success('Deactivation successful');
            dispatch(logout());
        }
    }, [isSuccess, dispatch, navigate])

    const handleDeactivate = async () => {
        await deactivate(id);
    }

  return (
    <>
      <Button variant="primary" className='ButtonToLinkDanger' style={{float: 'right'}} onClick={handleShow}>
        Deactivate Account
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='text-danger'>Confirm Account Deactivation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to deactivate?<br/>You can always reactivate when you change your mind.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeactivate}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DeativationModal