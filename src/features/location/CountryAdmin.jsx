import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap'
import { FaPlusSquare } from 'react-icons/fa'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import Alerts from '../../components/public/Commons/Alerts';
import { useGetCountriesQuery } from '../api/countryApi';
import { logout } from '../auth/authSlice';
import Country from './Country';

const CountryAdmin = () => {
  const {data: countries, isError, error } = useGetCountriesQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if(isError){
      if(error?.status === 401){
        dispatch(logout())
        toast.error('Please re-authenticate to continue');
        navigate('/login', { replace: true })
      }
    }
  }, [error, isError, navigate, dispatch])

  const content = countries?.Data?.length > 0 ? 
  countries?.Data?.map( country => (
    <Col key={country?.Id}>
      <Country country={country}/>
    </Col>
  )) :
  <Alerts
      heading={`No Country Record`} 
      body={`Please refresh the page if you feel this is an error or check back later.`} 
  />

  return (
    <Row className="g-3 y-2 JobCard RemoveSpace">
    <Col style={{margin: '1rem 0 0 0'}}> 
      <Row className="d-flex mb-4 mx-3">
        <Link to={`/admin/location/country/add`} style={{float: 'right', fontSize: '1.5rem'}}>
            <FaPlusSquare color="#212121"/>
        </Link>
      </Row>     
      <Row xs={1} sm={1} md={1} lg={2} className="g-3 JobCard">{ content }</Row>
    </Col>
  </Row>
  )
}

export default CountryAdmin