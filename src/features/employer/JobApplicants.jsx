import React from 'react'
import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import Alerts from '../../components/public/Commons/Alerts';
import { useGetJobApplicantsQuery } from '../api/jobApi';
import { logout } from '../auth/authSlice';
import ApplicantSummary from './ApplicantSummary';

const JobApplicants = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { data: applicants, isError, error } = useGetJobApplicantsQuery(id)

    useEffect(() => {
        if(isError){
            if(error?.status === 401){
                toast.error('Please re-authenticate to continue');
                dispatch(logout());
                navigate('/login')
            }
        }
    }, [dispatch, navigate, error, isError])

    const content = applicants?.Data?.length > 0 ? 
          applicants.Data?.map( applicant => (
            <Container fluid key={applicant?.Id}>
              <ApplicantSummary applicant={applicant}/>
            </Container>
          )) :
          <Alerts 
            heading={`No one has applied yet.`} 
            body={`List of Applicants profiles will appear here.`} 
          />

  return (
    <Row className="g-3 y-2 JobCard RemoveSpace">
      <Col style={{margin: '1rem 0 0 0'}}>      
        <Row xs={1} sm={1} md={1} lg={2} className="g-3 JobCard">{ content }</Row>
      </Col>
    </Row>
  )
}

export default JobApplicants