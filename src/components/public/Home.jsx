import { Container, Row, Col } from "react-bootstrap";
import JobStats from "../../features/job/JobStats";
import SearchBar from "./Commons/SearchBar";
import Jobs from "../../features/job/Jobs";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleNav } from "../../features/auth/authSlice";

const Home = () => {
    const dispatch = useDispatch()
    dispatch(toggleNav(true))
    const [urlData, setUrlData] = useState({
        token: '',
        userId: ''
    });

    const { token, userId } = urlData;

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const tokenFromUrl = new URLSearchParams(location.search).get('Token');
        const userIdFromUrl = new URLSearchParams(location.search).get('UserId');
        const tokenTypeFromUrl = new URLSearchParams(location.search).get('Type');
        setUrlData(() => ({
            token: tokenFromUrl,
            userId: userIdFromUrl,
        }));
        if(token && userId){
            const queryParams = { Token: token, UserId: userId };
            if(tokenTypeFromUrl === 'ConfirmEmail'){
                return navigate('/confirm-email', { state: queryParams });
            } else {   
                return navigate('/forgot-password', { state: queryParams });
            }
        }
    },[location.search, token, userId, navigate]);

  return (
    <Container fluid>
      <Row className='m-1 py-3'>
          <Col>
              <Row>
                  <Col>
                      <SearchBar />
                  </Col>
              </Row>
          </Col>
      </Row>
      <Row className='m-1 py-3'>
          <Col sm={0} md={1} lg={2}></Col>
          <Col sm={12} md={10} lg={8}>
              <JobStats />
          </Col>
          <Col sm={0} md={1} lg={2}></Col>
      </Row>
      <Row className='py-5'>
          <Col xs={0} md={1}></Col>
          <Col xs={12} md={10}>
              <Jobs
              />
          </Col>
          <Col xs={0} md={1}></Col>
      </Row>
    </Container>
  )
}

export default Home