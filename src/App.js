import './App.css';
import LoginForm from './components/login';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterForm from './components/register';
import Event from './components/event';

function App() {
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/event" element={<Event />} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
