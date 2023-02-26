import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'

const AltListSkeleton = ({ height }) => {
  return (
    <Container className='mt-3'>
        <Row className='mb-1'>
            <Col md={12} lg={6} className='mb-2'>
                <Card>
                    <div className="skeleton skeleton-big-text" style={{height: height}}></div>
                </Card>
            </Col>
            <Col md={12} lg={6} className='mb-2'>
                <Card>
                    <div className="skeleton skeleton-big-text" style={{height: height}}></div>
                </Card>
            </Col>
        </Row>
        <Row className='mb-1'>
            <Col md={12} lg={6} className='mb-2'>
                <Card>
                    <div className="skeleton skeleton-big-text" style={{height: height}}></div>
                </Card>
            </Col>
            <Col md={12} lg={6} className='mb-2'>
                <Card>
                    <div className="skeleton skeleton-big-text" style={{height: height}}></div>
                </Card>
            </Col>
        </Row>
    </Container>
  )
}

export default AltListSkeleton