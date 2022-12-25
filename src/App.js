import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Home from './components/public/Home';
import PageNotFound from './components/public/PageNotFound';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
