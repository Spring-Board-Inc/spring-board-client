import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaInfoCircle, FaCheck, FaTimes, FaUserPlus } from 'react-icons/fa';
import { atLeastFiveCharacters, atLeastTwoCharacters, isValidPhoneNumber, PWD_REGEX } from "../../helpers/Helpers";
import Spinners from '../../components/public/Commons/Spinner';
import '../../App.css'
import { useRegisterMutation } from "../api/authApi";
import { useGetCountriesNoPagingQuery } from "../api/countryApi";
import { GENDERS } from "../../helpers/Helpers";
import { useGetStatesNoPagingQuery } from "../api/stateApi";

const Register = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        gender: '',
        street: '',
        city: '',
        postalCode: '',
        state: '',
        countryId: '',
        roleIndex: 0
    });

    const firstNameRef = useRef();
    const { 
            firstName, 
            lastName, 
            email, 
            phoneNumber, 
            password, 
            confirmPassword, 
            gender, 
            street,
            city,
            postalCode,
            state,
            countryId,
            roleIndex
        } = formData;
   
    const dispatch = useDispatch()

    const [register, {data: reg, isLoading, isError, isSuccess, error }] = useRegisterMutation();
    const { data: countries } = useGetCountriesNoPagingQuery();
    const { data: states } = useGetStatesNoPagingQuery(countryId);

    useEffect(() => {
        if(isError){
            toast.error(error?.data?.Message)
        }

        if(isSuccess || reg){
            toast.success("Registration successful. Please check your mail to continue");
            navigate('/', { replace: true });
        }
    }, [reg, isError, isSuccess, error, navigate, dispatch]);
    
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value,
        }))
    }

    const [validated, setValidated] = useState(false);

    const onSubmit = async (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);
        e.preventDefault();
        const country = countries?.filter((country) => country?.Id === countryId)[0]?.Name;
        const userData = {
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
            confirmPassword,
            gender,
            street,
            city,
            postalCode,
            state,
            country,
            roleIndex
        }
        await register(userData);
    }

    const [validFirstName, setValidFirstName] = useState(false);
    const [firstNameFocus, setFirstNameFocus] = useState(false);

    const [validPhoneNumber, setValidPhoneNumber] = useState(false);
    const [phoneNumberFocus, setPhoneNumberFocus] = useState(false);

    const [validLastName, setValidLastName] = useState(false);
    const [lastNameFocus, setLastNameFocus] = useState(false);

    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [validPasswordMatch, setValidPasswordMatch] = useState(false);
    const [passwordMatchFocus, setPasswordMatchFocus] = useState(false);
    
    const [validStreet, setValidStreet] = useState(false);
    const [streetFocus, setStreetFocus] = useState(false);

    const [validCity, setValidCity] = useState(false);
    const [cityFocus, setCityFocus] = useState(false);

    const [validPostalCode, setValidPostalCode] = useState(false);
    const [postalCodeFocus, setPostalCodeFocus] = useState(false);

    const [validState, setValidState] = useState(false);

    const [validCountry, setValidCountry] = useState(false);

    const [validGender, setValidGender] = useState('');

    useEffect(() => {
        firstNameRef.current.focus();
    }, []);

    useEffect(() => {
        var result = atLeastFiveCharacters(street)
        setValidStreet(result)
    }, [street]);

    useEffect(() => {
        var result = atLeastFiveCharacters(postalCode)
        setValidPostalCode(result)
    }, [postalCode]);

    useEffect(() => {
        var result = atLeastTwoCharacters(city);
        setValidCity(result);
    }, [city]);

    useEffect(() => {
        var result = atLeastTwoCharacters(state);
        setValidState(result);
    }, [state]);

    useEffect(() => {
        var result = atLeastTwoCharacters(countryId);
        setValidCountry(result);
    }, [countryId]);

    useEffect(() => {
        var result = atLeastTwoCharacters(firstName);
        setValidFirstName(result);
    }, [firstName]);

    useEffect(() => {
        var result = atLeastTwoCharacters(lastName);
        setValidLastName(result);
    }, [lastName]);

    useEffect(() => {
        var result = atLeastTwoCharacters(gender);
        setValidGender(result);
    }, [gender]);

    useEffect(() => {
        var result = isValidPhoneNumber(phoneNumber);
        setValidPhoneNumber(result);
    }, [phoneNumber]);

    useEffect(() => {
        var result = atLeastTwoCharacters(email);
        setValidEmail(result);
    }, [email]);

    useEffect(() => {
        const result = PWD_REGEX.test(password)
        setValidPassword(result);
        const match = password === confirmPassword;
        setValidPasswordMatch(match);
    }, [password, confirmPassword]);

  return (
    <Container>
        <Row className='py-5 Main'>
            <Col sm={0} md={1} lg={3}></Col>
            <Col sm={12} md={10} lg={6}>
                <Form style={ {boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', padding: '1rem'} } className='mb-3' noValidate validated={validated} onSubmit={onSubmit}> 
                    <h2 className='mt-5 mb-3 text-center RegistrationHeading'>
                        <FaUserPlus /> Sign up
                    </h2>
                    <Row className="mb-3">
                        <Col sm={12} md={6} className='mb-3'>
                            <Form.Group>
                                <Form.Label className='RegistrationLabel'>First Name</Form.Label>
                                    <span className={validFirstName ? "valid" : "hide"}>
                                        <FaCheck />
                                    </span>
                                    <span className={validFirstName || !firstName ? "hide" : "invalid"}>
                                        <FaTimes />
                                    </span>
                                <Form.Control 
                                    type="text"
                                    ref={firstNameRef}
                                    autoComplete="off"
                                    id="firstName"
                                    name="firstName"
                                    value={firstName}
                                    onChange={onChange}
                                    onFocus={() => setFirstNameFocus(true)}
                                    onBlur={() => setFirstNameFocus(false)}
                                    required
                                    aria-invalid={validFirstName ? "false" : "true"}
                                    aria-describedby="uidnote"
                                    placeholder="Enter first name"/>
                                    <p id="uidnote" className={firstNameFocus && firstName && !validFirstName ? "instructions": "offscreen"}>
                                        <FaInfoCircle />
                                        At least two letters.<br/>
                                    </p>
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={6}>
                            <Form.Group>
                                <Form.Label className='RegistrationLabel'>Last Name</Form.Label>
                                    <span className={validLastName ? "valid" : "hide"}>
                                        <FaCheck />
                                    </span>
                                    <span className={validLastName || !lastName ? "hide" : "invalid"}>
                                        <FaTimes />
                                    </span>
                                <Form.Control 
                                    type="text"
                                    autoComplete="off"
                                    autoCapitalize='on'
                                    id="lastName"
                                    name="lastName"
                                    value={lastName}
                                    onChange={onChange}
                                    onFocus={() => setLastNameFocus(true)}
                                    onBlur={() => setLastNameFocus(false)}
                                    required
                                    aria-invalid={validLastName ? "false" : "true"}
                                    aria-describedby="uidnote1"
                                    placeholder="Enter last name"/>
                                    <p id="uidnote1" className={lastNameFocus && lastName && !validLastName ? "instructions": "offscreen"}>
                                        <FaInfoCircle />
                                        At least two letters.<br/>
                                    </p>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col sm={12} md={6} className='mb-3'>
                            <Form.Group>
                                <Form.Label className='RegistrationLabel'>Email</Form.Label>
                                    <span className={validEmail ? "valid" : "hide"}>
                                        <FaCheck />
                                    </span>
                                    <span className={validEmail || !email ? "hide" : "invalid"}>
                                        <FaTimes />
                                    </span>
                                <Form.Control 
                                    type="email"
                                    autoComplete="off"
                                    id="email"
                                    name="email"
                                    value={email}
                                    required
                                    onChange={onChange}
                                    onFocus={() => setEmailFocus(true)}
                                    onBlur={() => setEmailFocus(false)}
                                    aria-invalid={validEmail ? "false" : "true"}
                                    aria-describedby="emailnote"
                                    placeholder="Enter your email" />
                                    <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions": "offscreen"}>
                                        <FaInfoCircle />
                                        Must be a valid email address.<br/>
                                    </p>
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={6}>
                            <Form.Group>
                                <Form.Label className='RegistrationLabel'>Phone Number</Form.Label>
                                    <span className={validPhoneNumber ? "valid" : "hide"}>
                                        <FaCheck/>
                                    </span>
                                    <span className={validPhoneNumber || !phoneNumber ? "hide" : "invalid"}>
                                        <FaTimes/>
                                    </span>
                                    <Form.Control 
                                    type="text"
                                    autoComplete="off"
                                    required
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={phoneNumber}
                                    onChange={onChange}
                                    onFocus={() => setPhoneNumberFocus(true)}
                                    onBlur={() => setPhoneNumberFocus(false)}
                                    aria-invalid={validPhoneNumber ? "false" : "true"}
                                    aria-describedby="phonenote"
                                    placeholder="+1234567890" />
                                    <p id="emailnote" className={phoneNumberFocus && phoneNumber && !validPhoneNumber ? "instructions": "offscreen"}>
                                        <FaInfoCircle/>
                                        Must be a valid phone number entered in international format.<br/>
                                    </p>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col sm={12} md={6} className='mb-3'>
                            <Form.Group>
                                <Form.Label className='RegistrationLabel'>Password</Form.Label>
                                    <span className={validPassword ? "valid" : "hide"}>
                                        <FaCheck/>
                                    </span>
                                    <span className={validPassword || !password ? "hide" : "invalid"}>
                                        <FaTimes />
                                    </span>
                                <Form.Control 
                                    type="password"
                                    required
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={onChange}
                                    onFocus={() => setPasswordFocus(true)}
                                    onBlur={() => setPasswordFocus(false)}
                                    aria-invalid={validPassword ? "false" : "true"}
                                    aria-describedby="passwordnote"
                                    placeholder="Enter password" />
                                    <p id="passwordnote" className={passwordFocus && password && !validPassword ? "instructions": "offscreen"}>
                                        <FaInfoCircle/>
                                        Must be at least 8 characters long and must include at least, a lower and an uppercase letter, a number and a special character.<br/>
                                    </p>
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={6}>
                            <Form.Group>
                                <Form.Label className='RegistrationLabel'>Confirm Password</Form.Label>
                                    <span className={validPasswordMatch ? "valid" : "hide"}>
                                        <FaCheck/>
                                    </span>
                                    <span className={validPasswordMatch || !confirmPassword ? "hide" : "invalid"}>
                                        <FaTimes/>
                                    </span>
                                <Form.Control 
                                    type="password"
                                    required
                                    aria-invalid={validPasswordMatch ? "false" : "true"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={onChange}
                                    onFocus={() => setPasswordMatchFocus(true)}
                                    onBlur={() => setPasswordMatchFocus(false)}
                                    aria-describedby="passwordnote2" 
                                    placeholder="Confirm Password" />
                                    <p id="passwordnote2" className={passwordMatchFocus && confirmPassword && !validPasswordMatch ? "instructions": "offscreen"}>
                                        <FaInfoCircle />
                                        Must match password.<br/>
                                    </p>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col sm={12} md={7} className='mb-3'>
                            <Form.Group>
                                <Form.Label className='RegistrationLabel'>Street</Form.Label>
                                    <span className={validStreet ? "valid" : "hide"}>
                                        <FaCheck/>
                                    </span>
                                    <span className={validStreet || !street ? "hide" : "invalid"}>
                                        <FaTimes/>
                                    </span>
                                <Form.Control 
                                    type="text"
                                    required
                                    id="street"
                                    name="street"
                                    value={street}
                                    onChange={onChange}
                                    onFocus={() => setStreetFocus(true)}
                                    onBlur={() => setStreetFocus(false)}
                                    aria-invalid={validStreet ? "false" : "true"}
                                    aria-describedby="streetnote"
                                    placeholder="Street address" />
                                    <p id="streetnote" className={streetFocus && street && !validStreet ? "instructions": "offscreen"}>
                                        <FaInfoCircle/>
                                        Must be at least 5 characters long.<br/>
                                    </p>
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={5}>
                            <Form.Group>
                                <Form.Label className='RegistrationLabel'>City</Form.Label>
                                    <span className={validCity ? "valid" : "hide"}>
                                        <FaCheck/>
                                    </span>
                                    <span className={validCity || !city ? "hide" : "invalid"}>
                                        <FaTimes/>
                                    </span>
                                <Form.Control 
                                    type="text"
                                    required
                                    aria-invalid={validCity ? "false" : "true"}
                                    id="city"
                                    name="city"
                                    value={city}
                                    onChange={onChange}
                                    onFocus={() => setCityFocus(true)}
                                    onBlur={() => setCityFocus(false)}
                                    aria-describedby="citynote" 
                                    placeholder="City" />
                                    <p id="citynote" className={cityFocus && city && !validCity ? "instructions": "offscreen"}>
                                        <FaInfoCircle />
                                        Must be at least 2 characters long.<br/>
                                    </p>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col sm={12} md={8} className='mb-3'>
                            <Form.Group>
                                <Form.Label className='RegistrationLabel'>Select a Country</Form.Label>
                                <Form.Select
                                    required
                                    id="countryId"
                                    name="countryId"
                                    value={countryId}
                                    onChange={onChange}
                                    aria-invalid={validCountry ? "false" : "true"}
                                    aria-describedby="countrynote">
                                    <option></option>
                                    { countries && countries?.map(country => (
                                        <option key={country?.Id} value={country?.Id}>{country?.Name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={4}>
                            <Form.Group>
                                <Form.Label className='RegistrationLabel'>Postal Code</Form.Label>
                                    <span className={validPostalCode ? "valid" : "hide"}>
                                        <FaCheck/>
                                    </span>
                                    <span className={validPostalCode || !postalCode ? "hide" : "invalid"}>
                                        <FaTimes/>
                                    </span>
                                <Form.Control 
                                    type="text"
                                    required
                                    aria-invalid={validPostalCode ? "false" : "true"}
                                    id="postalCode"
                                    name="postalCode"
                                    value={postalCode}
                                    onChange={onChange}
                                    onFocus={() => setPostalCodeFocus(true)}
                                    onBlur={() => setPostalCodeFocus(false)}
                                    aria-describedby="postalnote" 
                                    placeholder="Postal Code" />
                                    <p id="postalnote" className={postalCodeFocus && postalCode && !validPostalCode ? "instructions": "offscreen"}>
                                        <FaInfoCircle />
                                        Must be at least 5 characters long.<br/>
                                    </p>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} md={8} className="mb-3">
                            <Form.Group>
                                <Form.Label className='RegistrationLabel'> Select a State</Form.Label>
                                <Form.Select
                                    required
                                    id="state"
                                    name="state"
                                    value={state}
                                    onChange={onChange}
                                    aria-invalid={validState ? "false" : "true"}
                                    aria-describedby="statenote">
                                    <option></option>
                                    { states && states?.map(state => (
                                        <option key={state?.Id}>{state?.AdminArea}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={4} className='mb-3'>
                            <Form.Group>
                            <Form.Label className='RegistrationLabel'> Select a Gender</Form.Label>
                                <Form.Select
                                    required
                                    id="gender"
                                    name="gender"
                                    value={gender}
                                    onChange={onChange}
                                    aria-invalid={validGender ? "false" : "true"}
                                    aria-describedby="gendernote">
                                    <option></option>
                                    { GENDERS && GENDERS?.map(gender => (
                                        <option key={gender}>{gender}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col sm={12} md={6} className='mb-2'>
                            { isLoading ?
                                <Button variant="secondary" className="w-100"  onClick={goBack} disabled>Back</Button> :
                                <Button variant="secondary" className="w-100"  onClick={goBack}>Back</Button>
                            }
                        </Col>
                        <Col sm={12} md={6} className='mb-2'>
                            { isLoading ? 
                                <Button type="submit" className='RegistrationButton'>
                                    <Spinners />
                                </Button> :
                                <Button 
                                    type="submit"
                                    className='RegistrationButton'>Submit
                                </Button>
                            }
                        </Col>
                    </Row> 
                    <p style={ {color: '#212121'} }>Already have an account? <Link to="/login">Login</Link></p>
                </Form>
            </Col>
            <Col sm={0} md={1} lg={3}></Col>
        </Row>
    </Container>
  )
}

export default Register