import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage/';
import { persistReducer, PERSIST } from 'redux-persist';
import { authApi } from '../features/api/authApi';
import authReducer from '../features/auth/authSlice';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { profileApi } from '../features/api/profileApi';
import { jobApi } from '../features/api/jobApi';
import { educationApi } from '../features/api/educationApi';
import { experienceApi } from '../features/api/experienceApi';
import { skillApi } from '../features/api/skillApi';
import { userSkillApi } from '../features/api/userSkillApi';
import { certificationApi } from '../features/api/certificationApi';
import { employerApi } from '../features/api/employerApi';
import { countryApi } from '../features/api/countryApi';
import { stateApi } from '../features/api/stateApi';
import { industryApi } from '../features/api/industryApi';
import { jobTypeApi } from '../features/api/jobTypeApi';
import { userApi } from '../features/api/userApi';
import { careerSummaryApi } from '../features/api/careerSummaryApi';
import { aboutApi } from '../features/api/aboutApi';
import { contactApi } from '../features/api/contactApi';
import { faqApi } from '../features/api/faqApi';

const persistConfig = {
  key: "root",
  version: 1,
  storage
}

const reducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [jobApi.reducerPath]: jobApi.reducer,
  [educationApi.reducerPath]: educationApi.reducer,
  [experienceApi.reducerPath]: experienceApi.reducer,
  [skillApi.reducerPath]: skillApi.reducer,
  [userSkillApi.reducerPath]: userSkillApi.reducer,
  [certificationApi.reducerPath]: certificationApi.reducer,
  [employerApi.reducerPath]: employerApi.reducer,
  [countryApi.reducerPath]: countryApi.reducer,
  [stateApi.reducerPath]: stateApi.reducer,
  [jobTypeApi.reducerPath]: jobTypeApi.reducer,
  [industryApi.reducerPath]: industryApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [careerSummaryApi.reducerPath]: careerSummaryApi.reducer,
  [aboutApi.reducerPath]: aboutApi.reducer,
  [contactApi.reducerPath]: contactApi.reducer,
  [faqApi.reducerPath]: faqApi.reducer,
  auth: authReducer
});

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST],
      },
    }).concat(
        authApi.middleware, profileApi.middleware, jobApi.middleware, educationApi.middleware,
        experienceApi.middleware, skillApi.middleware, userSkillApi.middleware, certificationApi.middleware,
        employerApi.middleware, countryApi.middleware, stateApi.middleware, jobTypeApi.middleware,
        industryApi.middleware, userApi.middleware, careerSummaryApi.middleware, aboutApi.middleware,
        contactApi.middleware, faqApi.middleware
      )
});

setupListeners(store.dispatch);