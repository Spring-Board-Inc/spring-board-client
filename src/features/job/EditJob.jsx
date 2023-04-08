import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { FaEdit } from 'react-icons/fa'
import ReactQuill from 'react-quill'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import EditorToolbar, { formats, modules } from '../../components/public/Commons/EditorToolbar'
import { yyyyMmDd } from '../../helpers/Helpers'
import { useGetCountriesQuery } from '../api/countryApi'
import { useGetEmployerQuery } from '../api/employerApi'
import { useGetIndustriesQuery } from '../api/industryApi'
import { useEditJobMutation } from '../api/jobApi'
import { useGetJobTypesQuery } from '../api/jobTypeApi'
import { useGetStatesQuery } from '../api/stateApi'
import { logout } from '../auth/authSlice'

const EditJob = () => {
  const { id } = useParams();
  const location = useLocation();
  let state = location.state;
  const pageNumber = 1;
  const searchTerm = '';
  const job = state;
  const { data: companies } = useGetEmployerQuery(''); 
  const { data: industries } = useGetIndustriesQuery();
  const { data: types } = useGetJobTypesQuery();
  const { data: countries } = useGetCountriesQuery({pageNumber, searchTerm});

  const [formData, setFormData] = useState({
    title: job?.Title,
    closingDate: yyyyMmDd(job?.ClosingDate),
    descriptions: job?.Descriptions,
    companyId: job?.CompanyId,
    industryId: job?.IndustryId,
    countryId: job?.CountryId,
    stateId: '',
    city: job?.City,
    typeId: job?.TypeId,
    numbersToBeHired: job?.NumbersToBeHired,
    salaryLowerRange: job?.SalaryLowerRange,
    salaryUpperRange: job?.SalaryUpperRange
  })

  const navigate = useNavigate();
  const goBack = () => navigate(-1)
  const dispatch = useDispatch()

  const [editJob, { isLoading, isSuccess, isError, error }] = useEditJobMutation()

  const [descriptions, setDescriptions] = useState(job?.Descriptions);

  const { title, closingDate, companyId, 
    industryId, city, typeId, countryId, stateId,
    salaryLowerRange, salaryUpperRange, numbersToBeHired
  } = formData;

  const { data: states } = useGetStatesQuery({pageNumber, countryId, searchTerm});
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const handleChange = value => {
      setDescriptions(value)
  }

  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if(isError){
        if(error?.status === 401){
            dispatch(logout())
            toast.error('Please re-authenticate to continue');
            navigate('/login', { replace: true })
        } else {
            toast.error(error?.data?.Message)
        }
    }
}, [dispatch, error, navigate, isError])

useEffect(() => {
    if(isSuccess){
        toast.success('Job record successfully added.');
        navigate('/employer/job', { replace: true })
    }
}, [isSuccess, navigate])


  const handleSubmit = async(e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    e.preventDefault();
    
    const formData = {
      title,
      descriptions,
      closingDate, 
      companyId, 
      industryId, 
      city, 
      typeId, 
      countryId, 
      stateId,
      numbersToBeHired,
      salaryLowerRange, 
      salaryUpperRange
    }

    const data = { id, formData }
    await editJob(data)
  };

  return (
    <Row>
        <Col sm={0} md={1} lg={2}></Col>
        <Col sm={12} md={10} lg={8}>
            <Card className='mt-3'>
                <Form className='p-3' noValidate validated={validated} onSubmit={handleSubmit}>
                  <h4 className='mt-5 mb-3 text-center RegistrationHeading'>
                        <FaEdit /> Edit Job
                  </h4>
                  <Row className="mb-1">
                    <Form.Group as={Col} sm={12} md={7} className='mb-2'>
                      <Form.Label>Job Title</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={onChange}
                      />
                      <Form.Control.Feedback type="invalid">Job Title is required!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} sm={12} md={5} className='mb-2'>
                      <Form.Label>Closing Date</Form.Label>
                      <Form.Control
                        type="date"   
                        id="closingDate"
                        name="closingDate"
                        value={closingDate}
                        onChange={onChange}
                        required
                      />
                    </Form.Group>
                  </Row>
                  <Row className='mb-1'>
                    <Form.Group as={Col} sm={12} md={6} className='mb-2'>
                      <Form.Label>Select Company</Form.Label>
                      <Form.Select
                          required
                          id="companyId"
                          name="companyId"
                          value={companyId}
                          onChange={onChange}
                        >
                          <option></option>
                          { companies && companies?.Data?.map(company => (
                              <option key={company?.Id} value={company?.Id}>{company?.Name}</option>
                          ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">Company is required!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} sm={12} md={6} className='mb-2'>
                      <Form.Label>Select Industry</Form.Label>
                      <Form.Select
                          required
                          id="industryId"
                          name="industryId"
                          value={industryId}
                          onChange={onChange}
                      >
                          <option></option>
                          { industries && industries?.map(industry => (
                              <option key={industry?.Id} value={industry?.Id}>{industry?.Industry}</option>
                          ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">Industry is required!</Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row className='mb-1'>
                    <Form.Group as={Col} sm={12} md={6} className='mb-2'>
                      <Form.Label>Select Job Type</Form.Label>
                      <Form.Select
                          required
                          id="typeId"
                          name="typeId"
                          value={typeId}
                          onChange={onChange}
                        >
                          <option></option>
                          { types && types?.map(type => (
                              <option key={type?.Id} value={type?.Id}>{type?.JobType}</option>
                          ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">Job Type is required!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} sm={12} md={6} className='mb-2'>
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        id="city"
                        name="city"
                        value={city}
                        onChange={onChange}
                      />
                      <Form.Control.Feedback type="invalid">City is required!</Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row className='mb-1'>
                    <Form.Group as={Col} sm={12} md={6} className='mb-2'>
                      <Form.Label>Select Country</Form.Label>
                      <Form.Select
                          required
                          id="countryId"
                          name="countryId"
                          value={countryId}
                          onChange={onChange}
                        >
                          <option></option>
                          { countries && countries?.Data?.map(country => (
                              <option key={country?.Id} value={country?.Id}>{country?.Name}</option>
                          ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">Coountry is required!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} sm={12} md={6} className='mb-2'>
                      <Form.Label>Select State</Form.Label>
                      <Form.Select
                          required
                          id="stateId"
                          name="stateId"
                          value={stateId}
                          onChange={onChange}
                      >
                          <option></option>
                          { states?.Data && states?.Data.map(state => (
                              <option key={state?.Id} value={state?.Id}>{state?.AdminArea}</option>
                          ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">State is required!</Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row className='mb-1'>
                    <Form.Group as={Col} sm={12} md={6} className='mb-2'>
                      <Form.Label>Salary Lower Range</Form.Label>
                      <Form.Control 
                          type="number"   
                          id="salaryLowerRange"
                          name="salaryLowerRange"
                          value={salaryLowerRange}
                          onChange={onChange}
                          required
                      />
                      <Form.Control.Feedback type="invalid">Salary lower range is required!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} sm={12} md={6} className='mb-2'>
                      <Form.Label>Salary Upper Range</Form.Label>
                      <Form.Control 
                          type="number"   
                          id="salaryUpperRange"
                          name="salaryUpperRange"
                          value={salaryUpperRange}
                          onChange={onChange}
                          required
                      />
                      <Form.Control.Feedback type="invalid">Salary upper range is required</Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row className='mb-1'>
                    <Form.Group as={Col} sm={12} md={6} className='mb-2'></Form.Group>
                    <Form.Group as={Col} sm={12} md={6} className='mb-2'>
                      <Form.Label>Numbers To Be Hired</Form.Label>
                      <Form.Control 
                          type="number"   
                          id="numbersToBeHired"
                          name="numbersToBeHired"
                          value={numbersToBeHired}
                          onChange={onChange}
                          required
                      />
                      <Form.Control.Feedback type="invalid">Numbers of People to be hired is required</Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row className="mb-1">
                    <Form.Group>
                      <Form.Label className='RegistrationLabel'>Job Description</Form.Label>
                      <div className="text-editor">   
                          <EditorToolbar />
                          <ReactQuill
                              theme="snow"
                              value={descriptions}
                              onChange={handleChange}
                              placeholder={"Job descriptions..."}
                              modules={modules}
                              formats={formats}
                              required
                          />
                      </div>
                    </Form.Group>
                  </Row>
                    <Row className="mb-3 mt-2">
                        <Col sm={12} md={6} className='mb-1'>
                            <Button variant='secondary' className='BackButton' onClick={goBack} disabled={isLoading}>Back</Button>
                        </Col>
                        <Col sm={12} md={6} className='mb-1'>
                            { isLoading ? 
                                <Button type="submit" className='RegistrationButton' disabled>Saving...</Button> :
                                <Button type="submit" className='RegistrationButton'>Save</Button>
                            }
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Col>
        <Col sm={0} md={1} lg={2}></Col>
    </Row>
  )
}

export default EditJob