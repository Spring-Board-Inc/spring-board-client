import { Row, Col } from "react-bootstrap";
import DarkSpinner from "../../components/public/Commons/DarkSpinner";
import JobSummary from "./JobSummary";
import '../../App.css';
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useGetJobsQuery } from "../api/jobApi";

const Jobs = () => {
    const { data: jobs, isLoading, isError, error } = useGetJobsQuery();
    
    useEffect(() => {
        if(isError){
            toast.error(error?.data?.Message);
        }

    }, [isError, error]);
    
  return (
    <Row xs={1} md={2} lg={3} className="g-3 JobCard">
      { isLoading ? 
        <DarkSpinner /> :
        <>
          {jobs && jobs.Data.map( job => (
            <Col key={job.Id}>
              <JobSummary job={job} />
            </Col>
          ))}
        </>
      }
    </Row>
  )
}

export default Jobs