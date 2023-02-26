import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { FaPlusSquare } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Alerts from '../../components/public/Commons/Alerts'
import Industry from './Industry'
import { useGetIndustriesQuery } from '../api/industryApi'
import AltListSkeleton from '../../components/public/Commons/skeletons/AltListSkeleton'

const IndustryAdmin = () => {
  const { data: industries, isLoading } = useGetIndustriesQuery()

  const content = industries?.length > 0 ? 
  industries?.map( industry => (
    <Col key={industry?.Id}>
      <Industry industry={industry}/>
    </Col>
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
  </Row>
)}

export default IndustryAdmin