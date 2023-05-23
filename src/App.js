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
import ApplicantDashboard from './components/private/ApplicantDashboard';
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
import Apply from './features/job/Apply';
import AdminDashboard from './components/private/AdminDashboard';
import UserAdmin from './features/user/UserAdmin';
import JobAdmin from './features/job/JobAdmin';
import Employers from './features/employer/Employers';
import JobTypeAdmin from './features/jobType/JobTypeAdmin';
import IndustryAdmin from './features/industry/IndustryAdmin';
import EmployerDashboard from './components/private/EmployerDashboard';
import EmployerJobs from './features/job/EmployerJobs';
import AddEmployer from './features/employer/AddEmployer';
import EditEmployer from './features/employer/EditEmployer';
import EmployerDetails from './features/employer/EmployerDetails';
import AddJob from './features/job/AddJob';
import EditJob from './features/job/EditJob';
import AddJobType from './features/jobType/AddJobType';
import EditJobType from './features/jobType/EditJobType'
import AddIndustry from './features/industry/AddIndustry';
import EditIndustry from './features/industry/EditIndustry';
import EditState from './features/location/EditState';
import AddState from './features/location/AddState';
import AddCountry from './features/location/AddCountry';
import EditCountry from './features/location/EditCountry';
import CountryAdmin from './features/location/CountryAdmin'
import SkillDashboard from './features/skill/SkillDashboard';
import AddAdminSkill from './features/skill/AddAdminSkill';
import EditAdminSkill from './features/skill/EditAdminSkill';
import CountryDetails from './features/location/CountryDetails';
import StateDetails from './features/location/StateDetails';
import AdminSkillDetails from './features/skill/AdminSkillDetails';
import JobTypeDetails from './features/jobType/JobTypeDetails';
import IndustryDetails from './features/industry/IndustryDetails';
import NestedJobDetails from './features/job/NestedJobDetails';
import JobApplicants from './features/employer/JobApplicants';
import ApplicantDetails from './features/employer/ApplicantDetails';
import AdminEmployerDetails from './features/employer/AdminEmployerDetails';
import { useSelector } from 'react-redux';
import Print from './Print';
import AddCareerSummary from './features/summary/AddCareerSummary';
import EditCareerSummary from './features/summary/EditCareerSummary';
import Resume from './features/summary/Resume';
import SummaryContainer from './features/summary/SummaryContainer';
import About from './components/public/About';
import Contact from './components/public/Contact';
import Faq from './components/public/Faq';
import AboutAdmin from './features/about/AboutAdmin';
import ContactAdmin from './features/contact/ContactAdmin';
import FaqsAdmin from './features/faqs/FaqsAdmin';
import AddAbout from './features/about/AddAbout';
import EditAbout from './features/about/EditAbout';
import AboutDetails from './features/about/AboutDetails';
import FaqDetails from './features/faqs/FaqDetails';
import EditFaq from './features/faqs/EditFaq';
import AddFaq from './features/faqs/AddFaq';

function App() {
  const { showNav } = useSelector((state) => state.auth)
  
  return (
    <>
      { showNav ? 
        <NavigationBar /> :
        <p></p>
      }
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='job/:jobId' element={<NestedJobDetails />} />
          <Route path='unauthorized' element={<Unauthorized />} />
          <Route path='register' element={<Register />} />
          <Route path='confirm-email' element={<ConfirmEmail />} />
          <Route path='reset-password' element={<ResetPassword />} />
          <Route path='forgot-password' element={<ForgotPassword />} />
          <Route path='print' element={<Print />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
          <Route path='faq' element={<Faq />} />
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
            <Route path='job/:id/apply' element={<Apply />} />
            <Route path='info' element={<ApplicantDashboard />}>
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
              <Route path='summary' element={<SummaryContainer />} />
              <Route path='resume' element={<Resume />} />
              <Route path='summary/add' element={<AddCareerSummary />} />
              <Route path='summary/edit/:userId' element={<EditCareerSummary />} />
            </Route>
          </Route>
          { /* These routes requires you to be an admin or super admin */}
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.SuperAdmin]} />}>
            <Route path='admin' element={<AdminDashboard />}>
              <Route path='user' element={<UserAdmin />} />
              <Route path='job' element={<JobAdmin />} />
              <Route path='job/:jobId' element={<JobDetails />} />
              <Route path='employer' element={<Employers />} />
              <Route path='employer/:id' element={<AdminEmployerDetails />} />
              <Route path='job-type' element={<JobTypeAdmin />} />
              <Route path='job-type/add' element={<AddJobType />} />
              <Route path='job-type/:id/edit' element={<EditJobType />} />
              <Route path='job-type/:id' element={<JobTypeDetails />} />
              <Route path='location/state/add' element={<AddState />} />
              <Route path='location/state/:id/:countryid/edit' element={<EditState />} />
              <Route path='location/state/:id' element={<StateDetails />} />
              <Route path='location/country' element={<CountryAdmin />} />
              <Route path='location/country/add' element={<AddCountry />} />
              <Route path='location/country/:id' element={<CountryDetails />} />
              <Route path='location/country/:id/edit' element={<EditCountry />} />
              <Route path='industry' element={<IndustryAdmin />} />
              <Route path='industry/add' element={<AddIndustry />} />
              <Route path='industry/:id/edit' element={<EditIndustry />} />
              <Route path='industry/:id' element={<IndustryDetails />} />
              <Route path='skill' element={<SkillDashboard />} />
              <Route path='skill/add' element={<AddAdminSkill />} />
              <Route path='skill/:id' element={<AdminSkillDetails />} />
              <Route path='skill/:id/edit' element={<EditAdminSkill />} />
              <Route path='about' element={<AboutAdmin />} />
              <Route path='about/add' element={<AddAbout />} />
              <Route path='about/:id' element={<AboutDetails />} />
              <Route path='about/edit/:id' element={<EditAbout />} />
              <Route path='contact' element={<ContactAdmin />} />
              <Route path='faqs' element={<FaqsAdmin />} />
              <Route path='faqs/:id' element={<FaqDetails />} />
              <Route path='faqs/:id/edit' element={<EditFaq />} />
              <Route path='faqs/add' element={<AddFaq />} />
            </Route>
          </Route>
          { /* These routes requires you to be an employer */}
          <Route element={<RequireAuth allowedRoles={[ROLES.Employer]} />}>
            <Route path='employer' element={<EmployerDashboard />}>
              <Route path='profile' element={<Employers />} />
              <Route path='profile/add' element={<AddEmployer />} />
              <Route path='profile/:id/edit' element={<EditEmployer />} />
              <Route path='profile/:id' element={<EmployerDetails />} />
              <Route path='job' element={<EmployerJobs />} />
              <Route path='job/add' element={<AddJob />} />
              <Route path='job/:jobId' element={<JobDetails />} />
              <Route path='job/:id/edit' element={<EditJob />} />
              <Route path='job/:id/applicants' element={<JobApplicants />} />
              <Route path='job/:id/applicants/:applicantId' element={<ApplicantDetails />} />
            </Route>
          </Route>
        </Route>
      </Routes>
      { showNav ? 
        <Footer /> :
        <p></p>
      }
    </>
  );
}

export default App;
