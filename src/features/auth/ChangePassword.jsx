import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Spinners from "../../components/public/Commons/Spinner";
import { FaLock, FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa';
import { PWD_REGEX } from "../../helpers/Helpers";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useChangePasswordMutation } from "../api/authApi";
import { useDispatch } from "react-redux";
import { logout } from "./authSlice";

const ChangePassword = ({ userId }) => {
    const [ changePassword, {data: pass, isLoading, isError, isSuccess, error } ] = useChangePasswordMutation();
    const [validNewPassword, setValidNewPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [validPasswordMatch, setValidPasswordMatch] = useState(false);
    const [passwordMatchFocus, setPasswordMatchFocus] = useState(false);

    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    const { currentPassword, newPassword, confirmNewPassword } = formData;
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const from = location.state?.from?.pathname || '/profile';

    useEffect(() => {
    const result = PWD_REGEX.test(newPassword)
    setValidNewPassword(result);
    const match = newPassword === confirmNewPassword;
    setValidPasswordMatch(match);
    }, [newPassword, confirmNewPassword]);

    useEffect(() => {
        if(isError){
            if(error?.status === 401 || error?.status === 403){
                dispatch(logout());
                toast.info("Please re-authenticate to continue.");
                navigate('/login', { replace: true })
            }else {
                toast.error(error?.data?.Message)
                navigate(from, { replace: true })
            }
        }

        if(isSuccess || pass){
            toast.success("Password change successful!.");
            navigate(from, { replace: true });
        }
        }, [pass, isError, isSuccess, error, navigate, from, dispatch]);

    const onChange = (e) => {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.name] : e.target.value,
    }))
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        if(userId){
            const data = {
                currentPassword,
                newPassword,
                confirmNewPassword,
                userId
            }
            await changePassword(data);
        }
    }

  return (
    <Container>
      <Row className='py-5 Main'>
        <Col sm={0} md={2} lg={4}></Col>
          <Col sm={12} md={8} lg={4} style={ {boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'} }>
            <h2 className='mt-5 mb-3 text-center RegistrationHeading'>
               <FaLock /> Forgot Password
            </h2>
            <Form onSubmit={onSubmit}>
              <Row className="mb-3">
                <Col lg={12} className='mb-3'>
                  <Form.Group>
                    <Form.Label className='RegistrationLabel'>Current Password</Form.Label>
                    <Form.Control 
                        type="password"
                        required
                        id="olfPassword"
                        name="oldPassword"
                        value={currentPassword}
                        onChange={onChange}
                        onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(false)}
                        placeholder="Enter current password" />
                  </Form.Group>
                </Col>
                <Col lg={12} className='mb-3'>
                  <Form.Group>
                    <Form.Label className='RegistrationLabel'>New Password</Form.Label>
                    <span className={validNewPassword ? "valid" : "hide"}>
                      <FaCheck />
                    </span>
                    <span className={validNewPassword || !newPassword ? "hide" : "invalid"}>
                      <FaTimes />
                    </span>
                    <Form.Control 
                        type="password"
                        required
                        id="newPassword"
                        name="newPassword"
                        value={newPassword}
                        onChange={onChange}
                        onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(false)}
                        aria-invalid={validNewPassword ? "false" : "true"}
                        aria-describedby="passwordnote"
                        placeholder="Enter new password" />
                        <p id="passwordnote" className={passwordFocus && newPassword && !validNewPassword ? "instructions": "offscreen"}>
                            <FaInfoCircle />
                            Must be at least 8 characters long and must include at least, a lower and an uppercase letter, a number and a special character.<br/>
                        </p>
                  </Form.Group>
                </Col>
                <Col lg={12} className='mb-3'>
                  <Form.Group>
                    <Form.Label className='RegistrationLabel'>Confirm New Password</Form.Label>
                    <span className={validPasswordMatch ? "valid" : "hide"}>
                        <FaCheck />
                    </span>
                    <span className={validPasswordMatch || !confirmNewPassword ? "hide" : "invalid"}>
                        <FaTimes />
                    </span>
                    <Form.Control 
                      type="password"
                      required
                      aria-invalid={validPasswordMatch ? "false" : "true"}
                      id="confirmNewPassword"
                      name="confirmNewPassword"
                      value={confirmNewPassword}
                      onChange={onChange}
                      onFocus={() => setPasswordMatchFocus(true)}
                      onBlur={() => setPasswordMatchFocus(false)}
                      aria-describedby="passwordnote2" 
                      placeholder="Confirm new password" />
                      <p id="passwordnote2" className={passwordMatchFocus && confirmNewPassword && !validPasswordMatch ? "instructions": "offscreen"}>
                          <FaInfoCircle />
                          Must match password.<br/>
                      </p>
                  </Form.Group>
                </Col>
                <Col lg={12}>
                { isLoading ? 
                  <Button type="submit" className='RegistrationButton'>
                      <Spinners />
                  </Button> :
                  <Button 
                      type="submit"
                      disabled={!validPasswordMatch || !validNewPassword ? true : false}
                      className='RegistrationButton'>Submit
                  </Button>
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

export default ChangePassword