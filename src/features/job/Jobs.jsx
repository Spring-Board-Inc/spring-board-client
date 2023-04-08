import { Row, Col, Container } from "react-bootstrap";
import JobSummary from "./JobSummary";
import '../../App.css';
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useGetJobsQuery } from "../api/jobApi";
import Alerts from "../../components/public/Commons/Alerts";
import ListSkeleton from "../../components/public/Commons/skeletons/ListSkeleton";
import ReactPaginate from "react-paginate";
import '../../App.css'

const Jobs = () => {
    const [pageNumber, setPageNumber] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const { data: jobs, isLoading, isError, error } = useGetJobsQuery({pageNumber, searchTerm});

    useEffect(() => {
        if(isError){
            toast.error(error?.data?.Message);
        }

    }, [isError, error]);

    const HandlePageClick = ({ selected: PageNumber }) => {
      setPageNumber(PageNumber + 1)
      setSearchTerm("")
    }

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
    <Container>
      {
        isLoading ?
          <ListSkeleton height='18rem'/> :
          <Row xs={1} sm={1} md={2} lg={2} className="g-3 JobCard">
            { content }
          </Row>
      }

      <ReactPaginate
        previousLabel={"<<"}
        nextLabel={">>"}
        breakLabel={"..."}
        pageCount={jobs?.MetaData.TotalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={1}
        containerClassName={"pagination justify-content-center mt-3"}
        pageClassName={"page-item Pagination"}
        pageLinkClassName={"page-link Pagination"}
        previousClassName={"page-item Pagination"}
        previousLinkClassName={"page-link Pagination"}
        nextClassName={"page-item Pagination"}
        nextLinkClassName={"page-link Pagination"}
        breakLinkClassName={"page-link Pagination"}
        breakClassName={"page-item Pagination"}
        activeClassName="PaginationActive"
        onPageChange={HandlePageClick}
      />
    </Container>
  )
}

export default Jobs