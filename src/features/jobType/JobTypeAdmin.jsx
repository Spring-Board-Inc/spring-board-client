import React from 'react'
import { Col, Row } from 'react-bootstrap';
import JobType from './JobType';
import Alerts from '../../components/public/Commons/Alerts'
import { FaPlusSquare } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useGetJobTypesQuery } from '../api/jobTypeApi';
import AltListSkeleton from '../../components/public/Commons/skeletons/AltListSkeleton';

const JobTypeAdmin = () => {
  const { data: jobTypes, isLoading } = useGetJobTypesQuery();
  
  const content = jobTypes?.length > 0 ? 
        jobTypes?.map( jobType => (
          <Col key={jobType?.Id}>
            <JobType jobType={jobType}/>
          </Col>
        )) :
      <Alerts
          heading={`No Job Type Record`} 
          body={`Please refresh the page if you feel this is an error or check back later.`} 
      />
          
  return (
    <Row className="g-3 y-2 JobCard RemoveSpace">
      <Col style={{margin: '1rem 0 0 0'}}> 
        <Row className="d-flex mb-4 mx-3">
          <Link to={`/admin/job-type/add`} style={{float: 'right', fontSize: '1.5rem'}}>
              <FaPlusSquare color="#212121"/>
          </Link>
        </Row>     
        {
          isLoading ?
          <AltListSkeleton height='3rem'/> :
          <Row xs={1} sm={1} md={1} lg={2} className="g-3 JobCard">{ content }</Row>
        }
      </Col>
    </Row>
  )}

export default JobTypeAdmin