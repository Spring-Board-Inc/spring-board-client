import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { FaChevronCircleLeft, FaChevronCircleRight, FaPlusSquare } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Alerts from '../../components/public/Commons/Alerts'
import Industry from './Industry'
import { useGetIndustriesQuery } from '../api/industryApi'
import AltListSkeleton from '../../components/public/Commons/skeletons/AltListSkeleton'
import ReactPaginate from 'react-paginate'

const IndustryAdmin = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  const { data: industries, isLoading } = useGetIndustriesQuery({ pageNumber, searchTerm })

  const HandlePageClick = ({ selected: PageNumber }) => {
    setPageNumber(PageNumber + 1)
    setSearchTerm("")
  }

  const content = industries?.Data.length > 0 ? 
  industries?.Data.map(industry => (
    <Link to={`${industry.Id}`} className='DeLink'>
        <Col key={industry?.Id}>
          <Industry industry={industry}/>
        </Col>
      </Link>
  )) :
  <Alerts
      heading={`No Industry Record`} 
      body={`Please refresh the page if you feel this is an error or check back later.`} 
  />
  
return (
  <Row className="g-3 y-2 JobCard RemoveSpace">
    <Col style={{margin: '1rem 0 0 0'}}> 
      <Row className="d-flex mb-4 mx-3">
        <Link to={`/admin/industry/add`} style={{float: 'right', fontSize: '1.5rem'}}>
            <FaPlusSquare color="#212121"/>
        </Link>
      </Row>     
      {
        isLoading ?
        <AltListSkeleton height='3rem'/> :
        <Row xs={1} sm={1} md={1} lg={2} className="g-3 JobCard">{ content }</Row>
      }
    </Col>
    
    <ReactPaginate
        previousLabel={<FaChevronCircleLeft color="#212121"/>}
        nextLabel={<FaChevronCircleRight color="#212121"/>}
        breakLabel={"..."}
        pageCount={industries?.MetaData.TotalPages}
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
)}

export default IndustryAdmin