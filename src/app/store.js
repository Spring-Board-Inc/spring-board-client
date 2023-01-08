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
        experienceApi.middleware, skillApi.middleware, userSkillApi.middleware, certificationApi.middleware
      )
});

setupListeners(store.dispatch);
