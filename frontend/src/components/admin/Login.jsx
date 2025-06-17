import React from 'react'

const Login = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-full max-w-sm p-6 max-md:m-6 border border-primary/30
      shadow-xl shadow-primary/15 rounded-1g'>
        <div className='flex flex-col items-center justify-center'>
            <div className='w-full py-6 text-center'>
                <h1 className='text-3xl font-bold'><span className='text-primary'>Admin</span> login</h1>
                <p className='font-light'>Enter your credentials to access admin panel</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Login
