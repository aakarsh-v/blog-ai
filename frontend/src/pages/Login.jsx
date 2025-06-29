import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAppContext } from '../../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const { axios, setToken, setIsAdmin, setUserName } = useAppContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/auth/login', { email, password });

      if (data.success) {
        toast.success(data.message);
        setToken(data.jwtToken);
        setIsAdmin(false);
        setUserName(data.name || "");
        localStorage.setItem('token', data.jwtToken);
        axios.defaults.headers.common['Authorization'] = data.jwtToken;
        navigate('/user'); // Redirect to user dashboard
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-full max-w-sm p-6 max-md:m-6 border border-emerald-200 shadow-xl shadow-emerald-100 rounded-lg'>
        <div className='flex flex-col items-center justify-center'>
          <div className='w-full py-6 text-center'>
            <h1 className='text-3xl font-bold'>
              <span className='text-emerald-600'>User</span> Login
            </h1>
            <p className='font-light'>Enter your credentials to log in</p>
          </div>
          <form onSubmit={handleSubmit} className='mt-6 w-full sm:max-w-md text-gray-600'>
            <div className='flex flex-col'>
              <label>Email</label>
              <input
                type='email'
                required
                placeholder='Enter email'
                className='border-b-2 border-gray-300 p-2 outline-none mb-6'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div className='flex flex-col'>
              <label>Password</label>
              <input
                type='password'
                required
                placeholder='Enter password'
                className='border-b-2 border-gray-300 p-2 outline-none mb-6'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <button
              type='submit'
              className='w-full py-3 font-medium bg-emerald-600 hover:bg-emerald-500 text-white rounded cursor-pointer transition-all'
            >
              Login
            </button>
          </form>
          <p className='text-sm mt-4'>
            Don't have an account?{' '}
            <Link to='/signup' className='text-emerald-600 hover:underline'>
              Sign up
            </Link>
          </p>
          <button
            type='button'
            className='mt-4 w-full py-2 border border-emerald-200 text-emerald-600 rounded hover:bg-emerald-50 transition-all'
            onClick={() => navigate('/admin')}
          >
            Admin? Click here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login; 