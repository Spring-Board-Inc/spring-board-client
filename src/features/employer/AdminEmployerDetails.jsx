import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Alerts from '../../components/public/Commons/Alerts'
import ListSkeleton from '../../components/public/Commons/skeletons/ListSkeleton'
import { useGetCompanyJobsQuery } from '../api/jobApi'
import JobSummary from '../job/JobSummary'
import EmployerDetails from './EmployerDetails'
import ReactPaginate from 'react-paginate'

const AdminEmployerDetails = () => {
    const [pageNumber, setPageNumber] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const { id } = useParams()
    const { data: jobs, isLoading } = useGetCompanyJobsQuery({ pageNumber, id, searchTerm });

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
    <Row>
        <EmployerDetails />
        <Row className='m-0 mt-5'>
            <h5 className='mb-2'><strong>Jobs</strong></h5>
            <div class="Border mb-2 w-100"></div>
            {
              isLoading ?
              <ListSkeleton height='15rem'/> :
              <>
              <Row xs={1} sm={1} md={2} lg={2} className="g-3 JobCard">
                { content }
              </Row>
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
              </>
            }
        </Row>
    </Row>
  )
}

export default AdminEmployerDetails