import React, { useEffect } from 'react'
import { Alert, Col, Container, Row } from 'react-bootstrap';
import { FaPlusSquare } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetSummariesQuery } from '../api/careerSummaryApi';
import { logout } from '../auth/authSlice';
import CareerSummary from './CareerSummary';

const SummaryContainer = () => {
    const { user } = useSelector((state) => state.auth);
    const userId = user?.UserClaims?.UserId;
    const { data: summaries, isError, error } = useGetSummariesQuery(userId);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const goBack = () => {
        navigate(-1)
    }

    useEffect(() => {
      if(isError){
        if(error?.status === 401){
          dispatch(logout())
          toast.error('Please re-authenticate to continue');
          navigate('/login', { replace: true })
        }
      }
    }, [error, isError, navigate, dispatch])

    const content = summaries?.length > 0 ?
        summaries?.map( summary => (
            <Container fluid key={summary?.Id}>
                <CareerSummary summary={summary}/>
            </Container>
        )) :
        <Container className='mt-3'>
            <Alert variant="danger" className="text-center">
                <Link to='add' className='p-2 mx-2'>
                    <FaPlusSquare color='#212121'size={20}/>
                </Link>
              <Alert.Heading>No Career Summary Record</Alert.Heading>
                <p>Please click the "+" symbol above to add.</p>
                <Link onClick={goBack}>Go Back</Link>
            </Alert>
          </Container>
    
  return (
    <Row className="g-3 y-2 JobCard RemoveSpace">
      <Col style={{margin: '1rem 0 0 0'}}>
        <Row xs={1} sm={1} md={1} lg={2} className="g-3 JobCard">{ content }</Row>
      </Col>
    </Row>
  )
}

export default SummaryContainer