import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Alerts from '../../components/public/Commons/Alerts'
import { useGetCompanyJobsQuery } from '../api/jobApi'
import JobSummary from '../job/JobSummary'
import EmployerDetails from './EmployerDetails'

const AdminEmployerDetails = () => {
    const { id } = useParams()
    const { data: jobs } = useGetCompanyJobsQuery(id);

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
    <Row>
        <EmployerDetails />
        <Row className='m-0 mt-5'>
            <h5 className='mb-2'><strong>Jobs</strong></h5>
            <div class="Border mb-2 w-100"></div>
            { content }
        </Row>
    </Row>
  )
}

export default AdminEmployerDetails