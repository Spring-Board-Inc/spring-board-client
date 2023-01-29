import { Row, Col } from "react-bootstrap";
import DarkSpinner from "../../components/public/Commons/DarkSpinner";
import JobSummary from "./JobSummary";
import '../../App.css';
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useGetJobsQuery } from "../api/jobApi";
import Alerts from "../../components/public/Commons/Alerts";

const Jobs = () => {
    const { data: jobs, isLoading, isError, error } = useGetJobsQuery();
    
    useEffect(() => {
        if(isError){
            toast.error(error?.data?.Message);
        }

    }, [isError, error]);

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
    <Row xs={1} sm={1} md={1} lg={2} className="g-3 mx-5 JobCard">
      { isLoading ? 
        <DarkSpinner /> :
        <>
          { content }
        </>
      }
    </Row>
  )
}

export default Jobs