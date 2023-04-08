import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Spinners from "../../components/public/Commons/Spinner";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEditAddressMutation, useGetUserProfileQuery } from "../api/profileApi";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { useGetCountriesNoPagingQuery } from "../api/countryApi";
import { useGetStatesQuery } from "../api/stateApi";

const EditAddress = () => {
    const { user } = useSelector((state) => state.auth);
    const { id } = useParams();
    const pageNumber = 1;
    const searchTerm = ''

    const { data: profile, isError: isProfileError, error: profileError } = useGetUserProfileQuery(id);
    const [editAddress, { data, isLoading, isSuccess, isError, error }] = useEditAddressMutation()
    const { data: countries } = useGetCountriesNoPagingQuery(); 

    const [formData, setFormData] = useState({
        street: profile?.Street,
        city: profile?.City,
        postalCode: profile?.PostalCode,
        state: profile?.State,
        country: profile?.Country
    });

    const { street, city, postalCode, state, country } = formData;
    const navigate = useNavigate();
    const findCountry = (data) => data?.Name === country;
    const countryByName = countries?.Data.find(findCountry);
    const countryId = countryByName?.Id;

    const { data: states } = useGetStatesQuery({pageNumber, countryId, searchTerm})

    const goBack = () => navigate(-1);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value,
        }))
    }

    useEffect(() => {
        if(isProfileError || isError){
            if(profileError?.status === 401 || 
                error?.status === 401){
                navigate('/login', { replace: true })
            }

            if(profileError?.status === 403 || error?.status === 403){
                navigate('/unauthorized', { replace: true })
            }
        }

        if(isSuccess || data){
            toast.success('Address successfully updated.');
            navigate('/profile', { replace: true })
        }
    }, [navigate, isProfileError, profileError, error, isError, data, isSuccess])
    
    const onSubmit = async (e) => {
        e.preventDefault();
        const data = { id, street, city, postalCode, state, country }
        if(user?.AccessToken){
           await editAddress(data);
        }
    }

  return (
    <Container>
        <Row className='py-5 Main'>
            <Col sm={0} md={2} lg={4}></Col>
                <Col sm={12} md={8} lg={4}>
                    <Form style={ {boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', padding: '1rem'} } onSubmit={onSubmit}>
                        <h2 className='mt-5 mb-3 text-center RegistrationHeading'>
                            <FaEdit /> Edit Address
                        </h2>
                        <Row className="mb-2">
                            <Col lg={12} className='mb-1'>
                                <Form.Group>
                                    <Form.Label className='RegistrationLabel'>Street</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        autoComplete="off"
                                        required      
                                        id="street"
                                        name="street"
                                        value={street}
                                        onChange={onChange}
                                        placeholder="1, Abc Street"/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col sm={12} md={6} className='mb-2'>
                                <Form.Group>
                                    <Form.Label className='RegistrationLabel'>City</Form.Label>
                                    <Form.Control 
                                        type="text"   
                                        id="city"
                                        name="city"
                                        value={city}
                                        onChange={onChange}
                                        required
                                        placeholder="Ikeja"/>
                                </Form.Group>
                            </Col>
                            <Col sm={12} md={6} className='mb-2'>
                                <Form.Group>
                                    <Form.Label className='RegistrationLabel'>Postal Code</Form.Label>
                                    <Form.Control 
                                        type="text"   
                                        id="postalCode"
                                        name="postalCode"
                                        value={postalCode}
                                        onChange={onChange}
                                        required
                                        placeholder="12345"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col sm={12} md={6} className='mb-2'>
                              <Form.Group>
                                <Form.Select
                                    required
                                    id="country"
                                    name="country"
                                    value={country}
                                    onChange={onChange}
                                >
                                    <option></option>
                                    {countries?.Data && countries?.Data?.map(country =>
                                        <option key={country?.Id}>{country?.Name}</option>
                                    )}
                                </Form.Select>
                              </Form.Group>
                            </Col>
                            <Col sm={12} md={6} className='mb-2'>
                              <Form.Group>
                                <Form.Select
                                    required
                                    id="state"
                                    name="state"
                                    value={state}
                                    onChange={onChange}
                                >
                                    <option></option>
                                    {states?.Data && states?.Data.map(state => 
                                        <option key={state?.Id}>{state?.AdminArea}</option>
                                    )}
                                </Form.Select>
                              </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col sm={12} md={6} className='d-flex'>
                            <Button className="btn-secondary w-100 m-1" onClick={goBack}>Back</Button>
                          </Col>
                          <Col sm={12} md={6} className='d-flex'>
                            { isLoading ? 
                                <Button type="submit" className='RegistrationButton w-100 m-1' disabled>
                                    <Spinners />
                                </Button> :
                                <Button type="submit" className='RegistrationButton w-100 m-1'>Save</Button>
                            }
                          </Col>
                        </Row>
                    </Form>
                  </Col>
            <Col sm={0} md={2} lg={4}></Col>
        </Row>
    </Container>
  )
}

export default EditAddress