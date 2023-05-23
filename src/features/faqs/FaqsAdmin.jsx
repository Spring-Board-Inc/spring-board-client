import React from 'react'
import { useState } from 'react'
import { useGetFaqsQuery } from '../api/faqApi'
import { Link } from 'react-router-dom'
import Faq from './Faq'
import { Col, Row } from 'react-bootstrap'
import Alerts from '../../components/public/Commons/Alerts'
import ReactPaginate from 'react-paginate'
import { FaChevronCircleLeft, FaChevronCircleRight, FaPlusSquare } from 'react-icons/fa'
import AltListSkeleton from '../../components/public/Commons/skeletons/AltListSkeleton'

const FaqsAdmin = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  const { data: faqs, isLoading } = useGetFaqsQuery({ pageNumber, searchTerm })

  const HandlePageClick = ({ selected: PageNumber }) => {
    setPageNumber(PageNumber + 1)
    setSearchTerm("")
  }

  const content = faqs?.Data.length > 0 ? 
    faqs?.Data.map(faq => (
    <Link to={`${faq.Id}`} className='DeLink'>
        <Col key={faqs?.Id}>
          <Faq faq={faq}/>
        </Col>
      </Link>
  )) :
  <Alerts
      heading={`No FAQ Record`} 
      body={`Please refresh the page if you feel this is an error or check back later.`} 
  />

  return (
    <Row className="g-3 y-3 JobCard RemoveSpace">
      <Col style={{margin: '1rem 0 0 0'}}> 
        <Row className="d-flex mb-4 mx-3">
          <Link to={`/admin/faqs/add`} style={{float: 'right', fontSize: '1.5rem'}}>
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
          pageCount={faqs?.MetaData.TotalPages}
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
export default FaqsAdmin