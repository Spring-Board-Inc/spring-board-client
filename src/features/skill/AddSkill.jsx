import { useEffect, useState } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetSkillsQuery } from "../api/skillApi";
import { logout } from "../auth/authSlice";
import { skillLevels } from "../../helpers/Helpers";
import { useAddUserSkillMutation } from "../api/userSkillApi";
import Spinners from "../../components/public/Commons/Spinner";

const AddSkill = () => {
    const { user } = useSelector((state) => state.auth);
    const userInfoId = user?.UserClaims?.UserInfomationId;

    const { data: skills, isError, error } = useGetSkillsQuery();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [addUserSkill, { isLoading, isError: isAddError, error: addError, isSuccess} ] = useAddUserSkillMutation();

    const [formData, setFormData] = useState({
        skillId: '',
        level: ''
    });

    const goBack = () => navigate(-1);
    
    const { 
        skillId,
        level
    } = formData;

    useEffect(() => {
        if(isError){
            if(error?.status === 401){
                dispatch(logout())
                toast.error('Please re-authenticate to continue')
                navigate('/login', { replace: true })
            }
        }
    }, [navigate, error, isError, dispatch])

    useEffect(() => {
        if(isAddError){
            if(addError?.status === 401){
                dispatch(logout())
                toast.error('Please re-authenticate to continue')
                navigate('/login', { replace: true })
            } else {
                toast.error(addError?.data?.Message)
            }
        }
    }, [addError, dispatch, isAddError, navigate])

    useEffect(() => {
        if(isSuccess){
            toast.success('Record successfully added.');
            navigate('/info/user-skill', { replace: true })
        }
    }, [isSuccess, navigate])

    const onSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            skillId,
            userInfoId,
            level
        }
        await addUserSkill(userData);
    }

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value,
        }))
    }

    useEffect(() => {
      if(isError){
        if(error?.status === 401){
          dispatch(logout())
          toast.error('Please re-authenticate to continue');
          navigate('/login', { replace: true })
        }
      }
    }, [error, isError, navigate, dispatch])

  return (
    <Row>
        <Col sm={0} md={3}></Col>
        <Col sm={12} md={6}>
            <Card className='mt-3'>
                <Form className='p-3' onSubmit={onSubmit}>
                    <h4 className='mt-5 mb-3 text-center RegistrationHeading'>
                        <FaPlus /> Add Skill
                    </h4>
                    <Row className="mb-3">
                        <Col lg={12} className='mb-3'>
                            <Form.Group>
                                <Form.Select
                                    required
                                    id="skillId"
                                    name="skillId"
                                    value={skillId}
                                    onChange={onChange}
                                >
                                    <option>Choose Skill</option>
                                    { skills && skills?.map(skill => (
                                        <option key={skill?.Id} value={skill?.Id}>{skill?.Description}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col lg={12} className='mb-1'>
                            <Form.Group>
                                <Form.Select
                                    required
                                    id="level"
                                    name="level"
                                    value={level}
                                    onChange={onChange}
                                >
                                    <option>Skill Level</option>
                                    { skillLevels && skillLevels?.map(level => (
                                        <option key={level}>{ level }</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col sm={12} md={6} className='mb-3'>
                            <Button variant='secondary' className='BackButton' onClick={goBack}>Back</Button>
                        </Col>
                        <Col sm={12} md={6}>
                            { isLoading ? 
                                <Button type="submit" className='RegistrationButton' disabled>
                                    <Spinners />
                                </Button> :
                                <Button type="submit" className='RegistrationButton'>Save</Button>
                            }
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Col>
        <Col sm={0} md={3}></Col>
    </Row>
  )
}

export default AddSkill