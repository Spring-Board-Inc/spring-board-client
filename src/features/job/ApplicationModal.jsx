import { Button, Form, Modal } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ApplicationModal = ({ user, job }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const navigate = useNavigate();
    const handleShow = () => {
        if(!user){
            if(!user){
                toast.error("Please log in to continue");
                setShow(false);
                navigate('/login', { replace: true })
            }
        } else {
            setShow(true);
        }
    }

  return (
    <>
      <Button className='ModalButton mt-1' onClick={handleShow}>Apply</Button>
      <Form>
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
            <Modal.Title>Apply for the position of {job.Title} at {job.Company}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>CV</Form.Label>
                    <Form.Control type="file"/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Back</Button>
            <Button className='ModalButton' onClick={handleClose}>Send Application</Button>
            </Modal.Footer>
        </Modal>
      </Form>
    </>
  )
}

export default ApplicationModal