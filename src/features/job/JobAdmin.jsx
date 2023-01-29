import { Col, Row } from 'react-bootstrap'
import Alerts from '../../components/public/Commons/Alerts';
import JobSummary from './JobSummary'

const JobAdmin = () => {
    const jobs = [];

    const content = jobs?.length > 0 ? 
          jobs?.map( job => (
            <Col key={job?.Id}>
              <JobSummary job={job}/>
            </Col>
          )) :
        <Alerts 
            heading={`No Job Record`} 
            body={`Please refresh the page if you feel this is an error or check back later.`} 
        />
          
  return (
    <Row xs={1} md={2} lg={3} className="g-3 JobCard mt-3">
      { false ? 
        <>Loading...</> :
        <>
          { content }
        </>
      }
    </Row>
  )
}

export default JobAdmin