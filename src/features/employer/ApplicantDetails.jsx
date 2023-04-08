import { Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { toggleNav } from '../auth/authSlice';
import ApplicantCV from './ApplicantCV';
import './Styles/styles.css'
import { FaPrint } from 'react-icons/fa';

const ApplicantDetails = () => {
  const location = useLocation();
  const state = location.state;
  const dispatch = useDispatch()
  
  const hideNav = () => {
    dispatch(toggleNav(false))
    window.setTimeout(showNav, 3000)
    }

    const showNav = () => {
        dispatch(toggleNav(true))
    }

  return (
    <Container className='Contain'>
        <Link 
            style={{ float: 'right' }} 
            className='p-2' 
            to='/print' 
            onClick={hideNav}
            state={state}
        ><FaPrint color='#212121'/></Link>
        <ApplicantCV applicant={state} isLoading={false} />
    </Container>
  )
}

export default ApplicantDetails