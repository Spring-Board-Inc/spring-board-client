import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { FaTrashAlt } from 'react-icons/fa';
//import { useDispatch } from 'react-redux';
//import { useNavigate } from 'react-router-dom';
//import { toast } from 'react-toastify';

const CountryDeleteModal = ({ id }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //const [deleteEmployer, { isSuccess, isError, error } ] = useDeleteEmployerMutation()
    //const navigate = useNavigate();
    //const dispatch = useDispatch();

    // useEffect(() => {
    //     if(isError){
    //         if(error?.status === 401){
    //             toast.error("Re-authenticate to continue")
    //             setShow(false)
    //             navigate('/login', { replace: true })
    //         } else {
    //             toast.error('Deactivation failed. Please try again');
    //             setShow(false);
    //         }
    //     }
    // }, [error, isError, navigate, dispatch])

    // useEffect(() => {
    //     if(isSuccess){
    //         navigate('/employer/profile', { replace: true })
    //         toast.success('Delete request successful');
    //     }
    // }, [isSuccess, dispatch, navigate])

    const handleDelete = async () => {
        setShow(false)
        //await deleteEmployer(id)
    }

  return (
    <>
    <Button className="DeButton px-3" style={{float: 'right'}} onClick={handleShow}>
        <FaTrashAlt color="red" size={20}/>
    </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='text-danger'>Are you sure you want to delete this Country?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CountryDeleteModal