import { Accordion, Button, Col, Container, Row } from 'react-bootstrap'
import { useGetFaqsQuery } from '../../features/api/faqApi'
import { useState } from 'react'
import SingleCardSkeleton from './Commons/skeletons/SingleCardSkeleton'
import Alerts from './Commons/Alerts'
import ReactPaginate from 'react-paginate'
import { FaArrowLeft, FaChevronCircleLeft, FaChevronCircleRight, FaEdit, FaTrashAlt } from 'react-icons/fa'

const Faq = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  const { data: faqs, isLoading } = useGetFaqsQuery({ pageNumber, searchTerm });
  const HandlePageClick = ({ selected: PageNumber }) => {
    setPageNumber(PageNumber + 1)
    setSearchTerm("")
  }
  
  return (
    <Container fluid>
      <Row className='py-5' style={{minHeight: '30rem'}}>
        <Col sm={0} md={2} lg={3}></Col>
        <Col sm={12} md={8} lg={6} className='py-5'>
          <Row className='mb-3 text-center'>
              <h2 className='RegistrationHeading'>FREQUENTLY ASKED QUESTIONS</h2>
          </Row>
          <Row>
          <Accordion>
            { isLoading ? 
              <>
              <SingleCardSkeleton height={30}/>
              <SingleCardSkeleton height={30}/>
              <SingleCardSkeleton height={30}/>
              </> :
              <>
                {
                  faqs?.Data.length > 0 ?
                  faqs?.Data && faqs?.Data.map(faq => (
                    <Accordion.Item eventKey={faq?.Id}>
                      <Accordion.Header>{faq?.Question}</Accordion.Header>
                      <Accordion.Body>
                        <Row>
                          {faq?.Answer}
                        </Row>
                      </Accordion.Body>
                    </Accordion.Item>
                  )) :
                  <Alerts
                    heading={`No FAQs`} 
                    body={`Refresh if you feel this is an error or check back later.`} 
                  />
                }
              </>
            }
          </Accordion>
          </Row>
        </Col>
        <Col sm={0} md={2} lg={3}></Col>
      </Row>
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
    </Container>
  )
}

export default Faq