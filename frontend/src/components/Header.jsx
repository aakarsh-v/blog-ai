import React, { useRef } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../../context/AppContext'
import star from '../assets/staricon.png'

const Header = () => {

  const {setInput, input} = useAppContext();
  const inputRef = useRef();

  const onSubmitHandler = async(e) => {
    e.preventDefault();
    setInput(inputRef.current.value)
  }

  const onClear = () => {
    setInput('');
    inputRef.current.value = ''
  }

  return (
    <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
      <div className='text-center mt-20 mb-8'>

        <div className='inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-emerald-200 bg-emerald-50 rounded-full text-sm text-emerald-700'>
            <p>New AI feature integrated</p>
            <img src={star} className='w-5' alt="" />
        </div>

        <h1 className='text-3xl sm:text-6xl font-semibold sm:leading-16 text-slate-900'>
            Your own <span className='text-emerald-600'>blogging</span> <br/>platform.
        </h1>

        <p className='my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-slate-500'>
            A space you empower your thoughts, to express yourself without filters or judgements. Wheather it is one word or thousands, your thoughts matters!
        </p>

        <form onSubmit={onSubmitHandler} className='flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-slate-200 bg-white rounded overflow-hidden'>
            <input ref={inputRef} type="text" placeholder='Search blogs' required className='w-full pl-4 outline-none'/>
            <button type='submit' className='bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-2 m-1.5 rounded transition-all cursor-pointer'>Search</button>

        </form>
        <div className='text-center mt-4'>
          {input && <button onClick={onClear}
          className='mt-4 bg-emerald-100 text-emerald-700 border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer'>Clear search</button>}
        </div>
      </div>
      <img src={assets.gradientBackground} className='absolute -top-50 -z-1 opacity-50'/>
    </div>
  )
}

export default Header
