import { Col, Container, Row } from 'react-bootstrap'
import { FaBook, FaGlobeAfrica } from 'react-icons/fa'
import { useGetAboutQuery } from '../../features/api/aboutApi'
import SingleCardSkeleton from './Commons/skeletons/SingleCardSkeleton';

const About = () => {
  const { data: aboutUs, isLoading } = useGetAboutQuery();

  return (
    <Container fluid>
        <Row className='py-5'>
            <Col sm={0} md={1} lg={2}></Col>
            <Col sm={12} md={10} lg={8}>
                <Row className='mt-5 mb-3 text-center mx-3'>
                    <h2 className='RegistrationHeading'>ABOUT US</h2>
                    { isLoading ?
                        <SingleCardSkeleton height={40}/> :
                        <p className=''>{aboutUs?.About}</p>
                    }
                </Row>
                <Row>
                    <Col sm={12} md={6}>
                        <Row 
                            className='my-auto mx-1 mb-3 AboutHover'
                            style={ {
                                boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', 
                                padding: '1rem',
                                minHeight: '16rem'} }>
                            <Col className='mb-3'>
                                <Row>
                                    <div className='text-center mb-2'>
                                        <div className="pt-2 DarkRoundBg">
                                            <FaBook color='#DEDEDE' size={28}/>
                                        </div>
                                    </div>
                                    <h3 className='text-center BoldText'>Our Mission</h3>
                                    {
                                        isLoading ?
                                        <SingleCardSkeleton height={100}/> :
                                        <p className='text-center'>{aboutUs?.Mission}</p>
                                    }
                                </Row>
                            </Col>   
                        </Row>
                    </Col>
                    <Col sm={12} md={6}>
                        <Row 
                            className='my-auto mx-1 mb-3 AboutHover' 
                            style={ {
                                boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', 
                                padding: '1rem',
                                minHeight: '16rem'} }>
                            <Col className='mb-3'>
                                <Row>
                                    <div className='text-center mb-2'>
                                        <div className="pt-2 DarkRoundBg">
                                            <FaGlobeAfrica color='#DEDEDE' size={28}/>
                                        </div>
                                    </div>
                                    <h3 className='text-center BoldText'>Our Vision</h3>
                                    {
                                        isLoading ?
                                        <SingleCardSkeleton height={100}/> :
                                        <p className='text-center'>{aboutUs?.Vision}</p>
                                    }
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
            <Col sm={0} md={1} lg={2}></Col>
        </Row>
    </Container>
  )
}

export default About