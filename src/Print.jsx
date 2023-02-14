import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import { toggleNav } from './features/auth/authSlice';
import ApplicantCV from './features/employer/ApplicantCV';

const Print = () => {
  const location = useLocation();
  const state = location.state;
  const dispatch = useDispatch();
  const navigate = useNavigate()
  dispatch(toggleNav(true))

  useEffect(() => {
    if(true){
      window.print()
      navigate(-1)
    }
  }, [dispatch, navigate])

  return (
    <Container className='Contain App-print-mode' fluid>
      <ApplicantCV applicant={state}/>
    </Container>
  )
}

export default Print