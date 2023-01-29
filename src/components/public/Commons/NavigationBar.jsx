import { Navbar, Container, Nav, NavLink, Button, NavDropdown } from 'react-bootstrap';
import { FaHome, FaUsers, FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaGraduationCap, FaBriefcase, FaCogs, FaBookOpen, FaMapMarker, FaIndustry, FaBuilding } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../features/auth/authSlice';
import { ROLES } from '../../../helpers/Helpers';

const NavigationBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const onLogout = () => {
        dispatch(logout());
        navigate('/', { replace: true });
    }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className='NavigationBar'>
        <Container>
            <Navbar.Brand as={Link} to="/">Spring Board</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="">
                    <Nav.Link eventKey={1} as={Link} to="/" className="NavLink">
                        <FaHome /> HOME
                    </Nav.Link>
                    <NavLink eventKey={2} as={Link} to="/about" className="NavLink">
                        <FaUsers /> ABOUT US
                    </NavLink>
                </Nav>
                <Nav className='me-auto'>
                    { user?.UserClaims?.Roles?.includes(ROLES.Applicant) ?
                       <> 
                        <NavDropdown title="DASHBOARD" id="navbarScrollingDropdown" className='NavLink'>
                            <NavDropdown.Item className='NavDropdownMenu'>
                                <NavLink eventKey={7} as={Link} to="/info/education">
                                    <FaGraduationCap /> Qualifications
                                </NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item className='NavDropdownMenu'>
                                <NavLink eventKey={8} as={Link} to="/info/experience">
                                    <FaBriefcase /> Experiences
                                </NavLink>
                            </NavDropdown.Item> 
                            <NavDropdown.Item className='NavDropdownMenu'>
                                <NavLink eventKey={9} as={Link} to="/info/user-skill">
                                    <FaCogs /> Skills
                                </NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item className='NavDropdownMenu RemoveBorderBottom'>
                                <NavLink eventKey={10} as={Link} to="/info/certification">
                                    <FaBookOpen /> Certifications
                                </NavLink>
                            </NavDropdown.Item>
                        </NavDropdown>
                        </> :
                        (user?.UserClaims?.Roles?.includes(ROLES.SuperAdmin) || user?.UserClaims?.Roles?.includes(ROLES.Admin)) ?
                        <>
                        <NavDropdown title="DASHBOARD" id="navbarScrollingDropdown" className='NavLink'>
                            <NavDropdown.Item className='NavDropdownMenu'>
                                <NavLink eventKey={11} as={Link} to="/admin/user">
                                    <FaUsers /> Users
                                </NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item className='NavDropdownMenu'>
                                <NavLink eventKey={12} as={Link} to="/admin/job">
                                    <FaBriefcase /> Jobs
                                </NavLink>
                            </NavDropdown.Item> 
                            <NavDropdown.Item className='NavDropdownMenu'>
                                <NavLink eventKey={13} as={Link} to="/admin/employer">
                                    <FaBuilding /> Employers
                                </NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item className='NavDropdownMenu RemoveBorderBottom'>
                                <NavLink eventKey={14} as={Link} to="/admin/industry">
                                    <FaIndustry /> Industries
                                </NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item className='NavDropdownMenu RemoveBorderBottom'>
                                <NavLink eventKey={15} as={Link} to="/admin/location">
                                    <FaMapMarker /> Locations
                                </NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item className='NavDropdownMenu RemoveBorderBottom'>
                                <NavLink eventKey={14} as={Link} to="/admin/job-type">
                                    <FaBookOpen /> Job Types
                                </NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item className='NavDropdownMenu RemoveBorderBottom'>
                                <NavLink eventKey={14} as={Link} to="/admin/skill">
                                    <FaCogs /> Skills
                                </NavLink>
                            </NavDropdown.Item>
                        </NavDropdown>
                        </> :
                        (user?.UserClaims?.Roles?.includes(ROLES.Employer)) ?
                        <>
                        <NavDropdown title="DASHBOARD" id="navbarScrollingDropdown" className='NavLink'>
                            <NavDropdown.Item className='NavDropdownMenu'>
                                <NavLink eventKey={15} as={Link} to="/employer/profile">
                                    <FaBuilding /> Organizations
                                </NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item className='NavDropdownMenu'>
                                <NavLink eventKey={16} as={Link} to="/employer/job">
                                    <FaBriefcase /> Jobs
                                </NavLink>
                            </NavDropdown.Item>
                        </NavDropdown>
                        </> : <></>
                    }
                </Nav>
                <Nav>
                    {user ? (<>
                    <NavLink eventKey={3} as={Link} to="/profile" className="NavLink">
                        <FaUser /> PROFILE
                    </NavLink>
                    <Button className='LogoutButton' onClick={onLogout} style={{display: 'inline-block', alignItems: 'flex-start'}}>    
                        <FaSignOutAlt /> SIGN OUT
                    </Button>
                    </>) : (<>
                    <NavLink eventKey={5} as={Link} to="/login" className="NavLink">
                        <FaSignInAlt /> SIGN IN
                    </NavLink>
                    <Nav.Link eventKey={6} as={Link} to="/register" className="NavLink">
                        <FaUserPlus /> SIGN UP
                    </Nav.Link>
                    </>)}
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default NavigationBar