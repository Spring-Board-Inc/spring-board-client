//import { useEffect } from 'react'
import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { FaPlusSquare } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Alerts from '../../components/public/Commons/Alerts';
import { useGetJobsQuery } from '../api/jobApi';
import { logout } from '../auth/authSlice';
import JobSummary from './JobSummary'

const EmployerJobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: jobs, isError, error } = useGetJobsQuery();
  
  useEffect(() => {
    if(isError){
      if(error?.status === 401){
        dispatch(logout())
        toast.error('Please re-authenticate to continue');
        navigate('/login', { replace: true })
      }
    }
  }, [error, isError, navigate, dispatch])

  const content = jobs?.Data?.length > 0 ? 
      jobs?.Data?.map( job => (
        <Col key={job?.Id}>
          <JobSummary job={job}/>
        </Col>
      )) :
      <Alerts 
          heading={`No Job Record`} 
          body={`Refresh if you feel this is an error or check back later.`} 
      />

  return (
    <Row className="g-3 y-2 JobCard RemoveSpace">
      <Col style={{margin: '1rem 0 0 0'}}> 
        <Row className="d-flex mb-4 mx-3">
          <Link to={`/employer/job/add`} style={{float: 'right', fontSize: '1.5rem'}}>
              <FaPlusSquare color="#212121"/>
          </Link>
        </Row>     
        <Row md={1} lg={2} className="g-3 JobCard">{ content }</Row>
      </Col>
    </Row>
  )
}

export default EmployerJobs