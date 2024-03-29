//import { useEffect } from 'react'
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { FaPlusSquare } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Alerts from '../../components/public/Commons/Alerts';
import ListSkeleton from '../../components/public/Commons/skeletons/ListSkeleton';
import { useGetJobsQuery } from '../api/jobApi';
import { logout } from '../auth/authSlice';
import JobSummary from './JobSummary'
import ReactPaginate from 'react-paginate';

const EmployerJobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: jobs, isError, error, isLoading } = useGetJobsQuery({ pageNumber, searchTerm });
  
  useEffect(() => {
    if(isError){
      if(error?.status === 401){
        dispatch(logout())
        toast.error('Please re-authenticate to continue');
        navigate('/login', { replace: true })
      }
    }
  }, [error, isError, navigate, dispatch])

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
    <Row className="g-3 y-2 JobCard RemoveSpace">
      <Col style={{margin: '1rem 0 0 0'}}> 
        <Row className="d-flex mb-4 mx-3">
          <Link to={`/employer/job/add`} style={{float: 'right', fontSize: '1.5rem'}}>
              <FaPlusSquare color="#212121"/>
          </Link>
        </Row> 
        {
          isLoading ?
            <ListSkeleton height='15rem' /> :
            <Row xs={1} sm={1} md={1} lg={2} className="g-3 JobCard">{ content }</Row>
        }
      </Col>

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
    </Row>
  )
}

export default EmployerJobs