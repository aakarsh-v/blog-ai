import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAppContext } from '../../../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const {axios, setToken, setIsAdmin} = useAppContext('');
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const {data} = await axios.post('/api/admin/login', {email, password})

          if(data.success){
            setToken(data.token);
            setIsAdmin(true);
            localStorage.setItem('token', data.token);
            axios.defaults.headers.common['Authorization'] = data.token;
            navigate('/admin');
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          toast.error(error.message);
        }
    }

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-full max-w-sm p-6 max-md:m-6 border border-emerald-200 shadow-xl shadow-emerald-100 rounded-lg'>
        <div className='flex flex-col items-center justify-center'>
            <div className='w-full py-6 text-center'>
                <h1 className='text-3xl font-bold'><span className='text-emerald-600'>Admin</span> login</h1>
                <p className='font-light'>Enter your credentials to access admin panel</p>
            </div>
            <form onSubmit={handleSubmit} className='mt-6 w-full sm:max-w-md text-gray-600'>
                <div className='flex flex-col'>
                    <label>Email</label>
                    <input type="email" required placeholder='Enter email'
                    className='border-b-2 border-gray-300 p-2 outline-none mb-6'
                    onChange={(e) => setEmail(e.target.value)} value={email}/>
                </div>

                <div className='flex flex-col'>
                    <label>Password</label>
                    <input type="password" required placeholder='Enter password'
                    className='border-b-2 border-gray-300 p-2 outline-none mb-6'
                    onChange={(e)=> setPassword(e.target.value)} value={password}/>
                </div>
                <button type='submit' className='w-full py-3 font-medium bg-emerald-600 hover:bg-emerald-500 text-white rounded cursor-pointer transition-all'>Login</button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Login
