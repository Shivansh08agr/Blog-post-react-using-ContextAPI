import React from 'react'
import Header from '../components/Header';
import Nav from './Nav';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
 
const Layout = () => {
  return (
    <div className='App'>
        <Header title={'React JS Blog'}/>
        <Nav/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Layout