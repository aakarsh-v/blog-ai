import React from 'react'
import {assets} from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext';
import blogLogo from '../assets/BlogIcon.png'

const Navbar = () => {

    const {navigate, token, isAdmin} = useAppContext()
  return (
    <div className='flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32'>
      <img onClick={() => navigate('/')} src={blogLogo} alt="logo" className='w-64 sm:w-44 cursor-pointer'/>
      <button 
        onClick={() => navigate(token ? (isAdmin ? '/admin' : '/user') : '/login')} 
        className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-2.5'
      >
        {token ? (isAdmin ? 'Admin Dashboard' : 'My Dashboard') : 'Login'}
        <img src={assets.arrow} className='w-3' alt="arrow" />
      </button>
    </div>
  )
}

export default Navbar
