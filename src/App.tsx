import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthLayout } from './layouts/AuthLayout';
import { Home } from './pages/Home';
import { Preview } from './pages/Preview';
import { Upload } from './pages/Upload';
import { Viewer } from './pages/Viewer';
import { Pricing } from './pages/Pricing';
import { Community } from './pages/Community';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/viewer/:id" element={<Viewer />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/community" element={<Community />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
