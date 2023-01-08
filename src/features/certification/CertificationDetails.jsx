import { useEffect } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { FaArrowLeft, FaEdit, FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDeleteCertificationMutation, useGetCertificationQuery } from "../api/certificationApi";
import { logout } from "../auth/authSlice";

const CertificationDetails = () => {
    const { id } = useParams();
    const { data: certification, isError, error } = useGetCertificationQuery(id);
    const [deleteCertification, { isSuccess, isError: delIsError, error: delError}] = useDeleteCertificationMutation();

    const minDate = new Date('0001-01-01T00:00:00').getFullYear();
    const xpDate = new Date(certification?.IssuingDate).getFullYear();

    const navigate = useNavigate();
    const goBack = () => navigate('/info/certification', { replace: true });
    const dispatch = useDispatch();
    
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

    useEffect(() => {
        if(delIsError){
            if(delError?.status === 401){
                dispatch(logout())
                navigate('/login', { replace: true });
                toast.error('Please re-authenticate to continue');
            } else {
                toast.error(delError?.data?.Message);
            }
        }
    }, [delIsError, delError, navigate, dispatch])

    useEffect(() => {
        if(isSuccess){
            toast.success("Record deleted successfully");
            navigate('/info/certification')
        }
    }, [isSuccess, navigate])

    const onDelete = async () => {
        if(id){
            await deleteCertification(id);
        }
    }

  return (
    <Row>
        <Col sm={0} md={1} lg={2}></Col>
        <Col sm={12} md={10} lg={8}>
            <Card className='mt-3'>
                <Card.Header className='JobCardHeader'>
                    <Card.Text>{certification?.Name}</Card.Text>
                </Card.Header>
                <Card.Body>
                    <Card.Subtitle style={{borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginBottom: '0.3rem'}}>
                        {certification?.IssuingBody}
                    </Card.Subtitle>
                    {
                        minDate !== xpDate ?
                        <Card.Text className="text-muted RemoveSpace">Issuing Date: {new Date(certification?.IssuingDate).toDateString()}.</Card.Text> :
                        <Card.Text className="text-muted RemoveSpace">Issuing Date: Running.</Card.Text>
                    }
                    <Button className="DeButton m-1" style={{float: 'right'}} onClick={onDelete}>
                        <FaTimes color="red"/>
                    </Button>
                    <Button className="DeButton m-1" style={{float: 'right'}}>
                        <Link to={`edit`}  className='EditLink'>
                            <FaEdit color="blue"/>
                        </Link>
                    </Button>
                    <Button className="DeButton m-1" style={{float: 'right'}} onClick={goBack}>
                        <FaArrowLeft color="gray"/>
                    </Button>
                </Card.Body>
            </Card>
        </Col>
        <Col sm={0} md={1} lg={2}></Col>
    </Row>
  )
}

export default CertificationDetails