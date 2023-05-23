import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useGetContactQuery } from '../../features/api/contactApi'
import SingleCardSkeleton from './Commons/skeletons/SingleCardSkeleton'
import { toPhoneLink, toEmailLink } from '../../helpers/Helpers'

const Contact = () => {
  const { data: contact, isLoading } = useGetContactQuery();
  const line1 = contact?.Address ? `${contact?.Address?.Line1}` : ''
  const address = line1 && contact?.Address?.Line2 ?
                  `${line1}, ${contact?.Address?.Line2}, ${contact?.Address?.City} (${contact?.Address?.PostalCode}). ${contact?.Address?.Country}.` :
                  `${line1}, ${contact?.Address?.City} (${contact?.Address?.PostalCode}). ${contact?.Address?.Country}.`;

  return (
    <Container fluid>
      <Row className='py-5'>
        <Col sm={0} md={1} lg={2}></Col>
        <Col sm={12} md={10} lg={8} className='py-5'>
          <Row className='mb-3 text-center'>
              <h2 className='RegistrationHeading'>CONTACT US</h2>
          </Row>
          <Row>
            <Col lg={4} md={12}>
              <Row className='my-auto mx-1 mb-3'>
                <Col 
                  className='text-center AboutHover' 
                  sm={12} md={4} lg={12}
                  style={ {
                    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', 
                    padding: '1rem',
                    minHeight: '8rem'} }>
                  <FaMapMarkerAlt size={30} />
                  <h6 className='mb-1'>Address</h6>
                  {
                    isLoading ?
                    <SingleCardSkeleton height={20}/> :
                    <p className='text-muted w-75 m-auto SmallFont'>{address}</p>
                  }
                </Col>
                <Col 
                  className='text-center AboutHover' 
                  sm={12} md={4} lg={12}
                  style={ {
                    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', 
                    padding: '1rem',
                    minHeight: '8rem'} }
                  >
                  <FaPhoneAlt size={20} />
                  <h6 className='mb-1'>Phone</h6>
                  {
                    isLoading ?
                    <SingleCardSkeleton height={35}/> :
                    contact?.Phones && contact?.Phones.map(phone => (
                      <p className='text-muted w-75 m-auto SmallFont mb-1' key={phone?.PhoneNumber}>
                        <a className='text-muted' href={toPhoneLink(phone?.PhoneNumber, phone?.Ext)}>{phone?.PhoneNumber} {phone?.Ext}</a>
                      </p>
                    ))
                  }
                </Col>
                <Col 
                  className='text-center AboutHover' 
                  sm={12} md={4} lg={12}
                  style={ {
                    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', 
                    padding: '1rem',
                    minHeight: '8rem'} }>
                  <FaEnvelope size={20} />
                  <h6 className='mb-1'>Email</h6>
                  {
                    isLoading ?
                    <SingleCardSkeleton height={35}/> :
                    contact?.Email && contact?.Email.map(email =>(
                      <p className='text-muted w-75 m-auto SmallFont mb-1' key={email?.EmailAddress}>
                        <a className='text-muted' href={toEmailLink(email?.EmailAddress)}>{email?.EmailAddress}</a>
                      </p>
                    ))
                  }
                </Col>
              </Row>
            </Col>
            <Col md={12} lg={8}>
              <Row 
                className='mb-3 text-center mx-1' 
                style={ {
                boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', 
                padding: '1rem',
                minHeight: '24rem'} }>
                <Form className='p-3'>
                  <Row className="mb-1">
                    <p className='text-center text-justify'>For enquiries, please refer to the <Link to="/faq">FAQ section</Link> or send us a message below.</p>
                    <Col sm={12} md={6} className='mb-2'>
                      <Form.Group>
                        <Form.Control 
                            type="text"   
                            id="name"
                            name="name"
                            required
                            placeholder='Name'
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={12} md={6} className='mb-2'>
                      <Form.Group>
                        <Form.Control 
                            type="email"   
                            id="email"
                            name="email"
                            required
                            placeholder='Email address'
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-1">
                    <Form.Group as={Col} className='mb-2'>
                      <Form.Control
                        required
                        as='textarea'
                        rows={5}
                        id="careerSummary"
                        name="careerSummary"
                        placeholder='Write your message'
                      />
                      <Form.Control.Feedback type="invalid">This field is required!</Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Col sm={0} md={2} lg={3}></Col>
                    <Col sm={12} md={8} lg={6}>
                      { false ? 
                        <Button type="submit" className='RegistrationButton' disabled>
                            Sending...
                        </Button> :
                        <Button type="submit" className='RegistrationButton'>Send</Button>
                      }
                    </Col>
                    <Col sm={0} md={2} lg={3}></Col>
                  </Row>
                </Form>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col sm={0} md={1} lg={2}></Col>
      </Row>
    </Container>
  )
}

export default Contact