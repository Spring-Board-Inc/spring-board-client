import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { FaPlusSquare } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Alerts from '../../components/public/Commons/Alerts';
import ListSkeleton from '../../components/public/Commons/skeletons/ListSkeleton';
import { useGetEmployersQuery } from '../api/employerApi';
import { logout } from '../auth/authSlice';
import EmployerSummary from './EmployerSummary';

const Employers = () => {
  const { data: employers, isLoading, isError, error } = useGetEmployersQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if(isError){
      if(error?.status === 401){
        toast.error('Please re-authenticate to continue');
        dispatch(logout());
        Navigate('/login', { replace: true })
      }
    }
  })

  const content = employers?.Data?.length > 0 ? 
          employers.Data?.map( employer => (
            <Container fluid key={employer?.Id}>
              <Link to={`${employer?.Id}`} className='DeLink'>
                <EmployerSummary employer={employer}/>
              </Link>
            </Container>
          )) :
          <Alerts 
            heading={`You have no Company Record`} 
            body={`Please click the "+" icon above to add.`} 
          />
  
  return (
    <Row className="g-3 y-2 JobCard RemoveSpace">
      <Col style={{margin: '1rem 0 0 0'}}> 
        <Row className="d-flex mb-4 mx-3">
          <Link to={`/employer/profile/add`} style={{float: 'right', fontSize: '1.5rem'}}>
              <FaPlusSquare color="#212121"/>
          </Link>
        </Row> 
        {
          isLoading ?
            <ListSkeleton height='15rem' /> :
            <Row xs={1} sm={1} md={1} lg={2} className="g-3 JobCard">{ content }</Row>
        }
      </Col>
    </Row>
  )
}

export default Employers