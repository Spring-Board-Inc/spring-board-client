import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import EmployerDashobardTabs from '../../features/profile/EmployerDashobardTabs'

const EmployerDashboard = () => {
  return (
    <Container className='py-5'>
      <Row className='mt-5'>
        <Col sm={0} md={1} lg={2}></Col>
        <Col sm={12} md={10} lg={8}>
          <Row>
              <Col>
                  <EmployerDashobardTabs />
              </Col>
          </Row>
        </Col>
        <Col sm={0} md={1} lg={2}></Col>
      </Row>
      <Row className='mt-2'>
        <Col sm={0} md={1} lg={2}></Col>
        <Col sm={12} md={10} lg={8}>
            <Outlet />
        </Col>
        <Col sm={0} md={1} lg={2}></Col>
    </Row>
    </Container>
  )
}

export default EmployerDashboard