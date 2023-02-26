import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetUserDetailsQuery } from '../api/userApi';
import { logout, toggleNav } from '../auth/authSlice';
import ApplicantCV from '../employer/ApplicantCV';

const Resume = () => {
  const { user } = useSelector((state) => state.auth);
  const userId = user?.UserClaims?.UserId;
  const { data: applicant, isLoading, isError, error } = useGetUserDetailsQuery(userId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(isError){
        if(error?.status === 401){
            toast.error('Please re-authenticate to continue');
            dispatch(logout());
            navigate('/login')
        }
    }
  }, [dispatch, navigate, error, isError])
  
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
            state={applicant}
        >Print</Link>
        <ApplicantCV applicant={applicant} isLoading={isLoading}/>
    </Container>
  )
}

export default Resume