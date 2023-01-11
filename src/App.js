import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Home from './components/public/Home';
import PageNotFound from './components/public/Commons/PageNotFound';
import NavigationBar from './components/public/Commons/NavigationBar';
import Footer from './components/public/Commons/Footer';
import Login from './features/auth/Login';
import JobDetails from './features/job/JobDetails';
import Profile from './features/profile/Profile';
import RequireAuth from './components/private/RequireAuth';
import { ROLES } from './helpers/Helpers';
import Unauthorized from './components/public/Commons/Unauthorized';
import Register from './features/auth/Register';
import ConfirmEmail from './features/auth/ConfirmEmail';
import ResetPassword from './features/auth/ResetPassword';
import ForgotPassword from './features/auth/ForgotPassword';
import ChangePassword from './features/auth/ChangePassword';
import UserInfo from './components/private/UserInfo';
import Educations from './features/education/Educations';
import Skills from './features/skill/Skills';
import Experiences from './features/experience/Experiences';
import Certifications from './features/certification/Certifications';
import CertificationDetails from './features/certification/CertificationDetails';
import ExperienceDetails from './features/experience/ExperienceDetails';
import EducationDetails from './features/education/EducationDetails';
import AddEducation from './features/education/AddEducation';
import AddExperience from './features/experience/AddExperience';
import AddCertification from './features/certification/AddCertification';
import AddSkill from './features/skill/AddSkill';
import EditNames from './features/profile/EditNames';
import EditAddress from './features/profile/EditAddress';
import EditEducation from './features/education/EditEducation';
import EditExperience from './features/experience/EditExperience';
import EditCertification from './features/certification/EditCertification';
import EditSkill from './features/skill/EditSkill';
import UploadPhoto from './features/profile/UploadPhoto';
import UpdatePhoto from './features/profile/UpdatePhoto';

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='jobs/:jobId' element={<JobDetails />} />
          <Route path='unauthorized' element={<Unauthorized />} />
          <Route path='register' element={<Register />} />
          <Route path='confirm-email' element={<ConfirmEmail />} />
          <Route path='reset-password' element={<ResetPassword />} />
          <Route path='forgot-password' element={<ForgotPassword />} />
          <Route path='*' element={<PageNotFound />} />
          { /* Routes that require log in */}
          <Route element={<RequireAuth allowedRoles={[ROLES.Applicant, ROLES.Admin, ROLES.Employer, ROLES.SuperAdmin]} /> }>
            <Route path='profile' element={<Profile />} />
            <Route path='change-password' element={<ChangePassword />}/>
            <Route path='profile/edit-names/:id' element={<EditNames />} />
            <Route path='profile/edit-address/:id' element={<EditAddress />} />
            <Route path='profile/:id/upload-image' element={<UploadPhoto />} />
            <Route path='profile/:id/update-image' element={<UpdatePhoto />} />
          </Route>
          { /* This route requires you to be an applicant */}
          <Route element={<RequireAuth allowedRoles={[ROLES.Applicant]} />}>
            <Route path='info' element={<UserInfo />}>
              <Route path="education" element={<Educations />} />
              <Route path='user-skill' element={<Skills />} />
              <Route path='experience' element={<Experiences />} />
              <Route path='certification' element={<Certifications />} />
              <Route path='certification/:id' element={<CertificationDetails />} />
              <Route path='experience/:id' element={<ExperienceDetails />} />
              <Route path='education/:id' element={<EducationDetails />} />
              <Route path='education/add' element={<AddEducation />} />
              <Route path='experience/add' element={<AddExperience />} />
              <Route path='certification/add' element={<AddCertification />} />
              <Route path='user-skill/add' element={<AddSkill />} />
              <Route path='education/:id/edit' element={<EditEducation />} />
              <Route path='experience/:id/edit' element={<EditExperience />} />
              <Route path='certification/:id/edit' element={<EditCertification />} />
              <Route path='user-skill/:id/edit' element={<EditSkill />} />
            </Route>
          </Route>
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
