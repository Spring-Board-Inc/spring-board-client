import { Col, Row } from 'react-bootstrap'
import { FaCalendarAlt, FaEnvelope, FaGithub, FaGlobe, FaInfoCircle, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa'
import './CV.css'

const CV = () => {
  return (
    <div className='body'>
        <Row className='CenterSearchBar mb-2'>
            <h1 style={{ fontWeight: 'bold'}} className='text-center'>OJO TOBA RUFUS</h1>
            <div class="Border mb-2 w-75" styl></div>
            <p className='CenterSearchBar' style={{width: '90%'}}>
                <span className='mx-2'><FaMapMarkerAlt/>  Abuja, Nigeria.</span>|
                <span className='mx-1'><FaPhoneAlt/><a href="tel:+2348035222858">+234 803 522 2858</a></span>|
                <span className='mx-1'><FaEnvelope/> <a href="mailto:ojotobar@gmail.com">ojotobar@gmail.com</a></span>|
                <span className='mx-1'><FaGithub/>  <a href="https://github.com/ojotobar">Github</a></span>|
                <span className='mx-1'><FaGlobe />  <a href="https://ojo-toba.herokuapp.com">Portfolio</a></span>
            </p>
        </Row>
        <Row>
            <h4 className='mb-0' style={{ fontWeight: 'bold'}}>EXPERIENCE</h4>
            <div class="Border mb-2" style={{width: '90%'}}></div>
            <Row className='m-1'>
                <Col lg={12} className='mb-1'>
                    <p className='text-muted mb-1'>ENGINEER I at <strong>CAVISTA TECHNOLOGY SOLUTIONS</strong> &mdash; <FaCalendarAlt/> April 1, 2022 - Present. <FaMapMarkerAlt/> Remote.</p>
                    <p className='mx-4' style={{fontSize: '0.9rem'}}>Contributed as Engineer I in developing and maintaining Web Services that enable millions of Americans access quality Health care at Home.</p>
                    <p className='mb-1 mx-2' style={{fontSize: '0.9rem'}}>&mdash; Play key role in building large-scale public facing, high volume based Web applications.</p>
                    <p className='mb-1 mx-2' style={{fontSize: '0.9rem'}}>&mdash; Develop high-performance and scalable applications in an agile environment.</p>
                    <p className='mb-1 mx-2' style={{fontSize: '0.9rem'}}>&mdash; Implement new and improvement features.</p>
                    <p className='mb-1 mx-2' style={{fontSize: '0.9rem'}}>&mdash; Participate in the ongoing development of applications that meet the needs of Clients.</p>
                    <p  className='mb-1 mx-2' style={{fontSize: '0.9rem'}}>&mdash; Deliver new functionalities and change requests for existing applications.</p>
                    <p  className='mb-1 mx-2' style={{fontSize: '0.9rem'}}>&mdash; Participate in peer code reviews.</p>
                    <p className='mx-1' style={{fontSize: '0.9rem'}}>
                        <span style={{ fontWeight: 'bold', fontSize: '1rem'}}>Tech Stack: </span> C#, Asp.Net, MySQL, Asp.Net MVC, Hangfire, Redis, Docker, MongoDB, JavaScript, Bitbucket Server (Stash)
                    </p>
                </Col>
                <Col lg={12}>
                    <p className='text-muted mb-1'>SOFTWARE ENGINEER at <strong>DECAGON</strong> &mdash; <FaCalendarAlt/> October 8, 2020 - March 31, 2022. <FaMapMarkerAlt/> Lagos, Nigeria.</p>
                    <p className='mx-4' style={{fontSize: '0.9rem'}}>Worked as part of a Team that built a world class application for automating training processes of Software Developers. Partly took up a front-end role using React and AngularJS for a few months.</p>
                    <p className='mb-1 mx-2' style={{fontSize: '0.9rem'}}>&mdash; Design, implement, test, deploy and document backend software solutions.</p>
                    <p className='mb-1 mx-2' style={{fontSize: '0.9rem'}}>&mdash; Help validate business requirements and plan delivery of work.</p>
                    <p className='mb-1 mx-2' style={{fontSize: '0.9rem'}}>&mdash; Working with project managers and the business to implement new projects and functionalities.</p>
                    <p className='mx-1' style={{fontSize: '0.9rem'}}>
                        <span style={{ fontWeight: 'bold', fontSize: '1rem'}}>Tech Stack: </span> C#, Asp.Net, SQL Server, Asp.Net MVC, Docker, Github, React, Angular
                    </p>
                </Col>
            </Row>
        </Row>
        <Row>
            <h4 className='mb-0' style={{ fontWeight: 'bold'}}>EDUCATION</h4>
            <div class="Border mb-2" style={{width: '90%'}}></div>
            <Row className='m-1'>
                <Col lg={12} className='mb-2'>
                    <p className='text-muted mb-1'>Bachelors in <strong>ECONOMICS</strong> at <strong>UNIVERSITY OF ILORIN</strong> &mdash; <FaCalendarAlt/> January, 2006 - July, 2009. <FaMapMarkerAlt/> Ilorin, Nigeria.</p>
                </Col>
            </Row>
        </Row>
        <Row>
            <h4 className='mb-0' style={{ fontWeight: 'bold'}}>CERTIFICATION</h4>
            <div class="Border mb-2" style={{width: '90%'}}></div>
            <Row className='m-1'>
                <Col lg={12} className='mb-2'>
                    <p className='text-muted mb-1'>
                        <strong><a href="https://c46e136a583f7e334124-ac22991740ab4ff17e21daf2ed577041.ssl.cf1.rackcdn.com/Certificate/ScrumFundamentalsCertified-TobaOjo-874726.pdf">SCRUM Fundamentals Certified</a></strong> (SCRUMStudy) &mdash; <FaCalendarAlt/> September 2021.
                    </p>
                </Col>
                <Col lg={12} className='mb-2'>
                    <p className='text-muted mb-1'>
                        <strong><a href="https://www.credly.com/badges/dfb8d978-2207-41c5-864c-31ed8500b715/public_url">Applied Data Science I</a></strong> (WorldQuant University) &mdash; <FaCalendarAlt/> June 2021.
                    </p>
                </Col>
            </Row>
        </Row>
        <Row>
            <h4 className='mb-0' style={{ fontWeight: 'bold'}}>SKILLS</h4>
            <div class="Border mb-2" style={{width: '90%'}}></div>
            <Row className='mx-1'>
                <Col lg={12} className=''>
                    <p className='mb-1'><FaInfoCircle/> <strong>Technical Skills</strong>: <span style={{fontSize: '0.9rem'}}>C#, Asp.Net Core, Asp.Net MVC, Hangfire, Docker, Redis, MySQL, SQL Server, MongoDB, REST API, JavaScript, ReactJS, AngularJS, Clean Architecture.</span></p>
                </Col>
            </Row>
            <Row className='mx-1 mb-2'>
                <Col lg={12} className=''>
                    <p className='mb-1'><FaInfoCircle/> <strong>Soft Skills</strong>: <span style={{fontSize: '0.9rem'}}>Jira, Agile (Scrum), Collaboration, Communication</span></p>
                </Col>
            </Row>
        </Row>
        <Row>
            <h4 className='mb-0' style={{ fontWeight: 'bold'}}>PROJECTS</h4>
            <div class="Border mb-2" style={{width: '90%'}}></div>
            <Row className='mx-1'>
                <Col lg={12} className=''>
                    <p class="mb-0"><FaInfoCircle/> <strong><a href="https://deca-blog.netlify.app">Deca Blog:</a></strong><span className='text-muted' style={{fontSize: '0.9rem', fontStyle: 'italic'}}> <strong>Technologies:</strong> C#, Asp.Net Core, AngularJS, Docker, SQL Server, Entity Framework</span></p>
                </Col>
            </Row>
            <Row className='mx-1'>
                <Col lg={12} className=''>
                    <p class="mb-0"><FaInfoCircle/> <strong><a href="https://carr-x.herokuapp.com">CarX:</a></strong><span className='text-muted' style={{fontSize: '0.9rem', fontStyle: 'italic'}}> <strong>Technologies:</strong> C#, Asp.Net Core, Asp.Net MVC, SQL Server, Web Scrapping, Entity Framework</span></p>
                </Col>
            </Row>
            <Row className='mx-1'>
                <Col lg={12} className=''>
                    <p class="mb-0"><FaInfoCircle/> <strong><a href="https://www.good.com">Springboard</a></strong><span style={{fontSize: '0.7rem'}}>(Ongoing)</span><span className='text-muted' style={{fontSize: '0.9rem', fontStyle: 'italic'}}> <strong>Technologies:</strong> C#, Asp.Net Core, SQL Server, ReactJS, Hangfire, Entity Framework</span></p>
                </Col>
            </Row>
        </Row>
    </div>
  )
}

export default CV