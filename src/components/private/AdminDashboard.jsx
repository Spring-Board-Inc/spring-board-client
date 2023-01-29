import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Outlet } from 'react-router'
import AdminDashboardTabs from '../../features/profile/AdminDashboardTabs'

const AdminDashboard = () => {
  return (
    <Container className='py-5'>
      <Row className='mt-5'>
        <Col sm={0} md={1} lg={2}></Col>
        <Col sm={12} md={10} lg={8}>
          <Row>
              <Col>
                  <AdminDashboardTabs />
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

export default AdminDashboard