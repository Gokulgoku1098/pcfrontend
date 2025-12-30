import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header'
import Landingpage from "./pages/Landingpage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from './components/Footer';
import Cpu from './pages/Cpu';
import Cpucooler from './pages/Cpucooler';
import Motherboard from './pages/Motherboard';
import Storage from './pages/Storage';
import Cart from './pages/Cart';
import Placeorder from './pages/Placeorder';
import Completebuild from './pages/Completebuild';
import Interface from './pages/Interface';
import Load from './pages/Load';

import Trend from './pages/Trend';
import Detial from './pages/Detial';
import MyOrders from './pages/Myorder';
import AdmP from './pages/AdmP';
import AdmO from './pages/AdmO';
import AdmU from './pages/AdmU';
import Payment from './pages/Payment';
import Admin from './pages/Admin';

function App() {


  return (
    <>

      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Cpu" element={<Cpu />} />
          <Route path="/Cpucooler" element={<Cpucooler />} />
          <Route path="/motherboard" element={<Motherboard />} />
          <Route path="/storage" element={<Storage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/placeorder" element={<Placeorder />} />
          <Route path="/completebuild" element={<Completebuild />} />
          <Route path="/interface" element={<Interface />} />
          <Route path="/load" element={<Load />} />

          <Route path="/trend" element={<Trend />} />
          <Route path="/admin" element={<Admin />}>
            <Route path="products" element={<AdmP />} />
            <Route path="orders" element={<AdmO />} />
            <Route path="users" element={<AdmU />} />
          </Route>

          <Route path="/myorder" element={<MyOrders />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/detial/:id" element={<Detial />} />
        </Routes>
        <Footer />
      </BrowserRouter>

    </>
  )
}

export default App
