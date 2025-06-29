import React from 'react'
import { assets, footer_data } from '../assets/assets'
import blogLogo from '../assets/blogicon.png'

const Footer = () => {
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 bg-slate-50'>
      <div className='flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-slate-200 text-slate-500'>
        <div>
            <img src={blogLogo} alt="logo" className='w-32 sm:w-44'/>
            <p className='max-w-[410px] mt-6'>The links in footer won't work obiously cuz this is sort of dummy website...cuz its a project(duh)</p>
        </div>

        <div className='flex flex-wrap justify-between w-full md:w-[45%] gap-5'>
            {footer_data.map((section, index)=> (
                <div key ={index}>
                    <h3 className='font-semibold text-base text-emerald-700 md:mb-5 mb-2'>{section.title}</h3>
                    <ul className='text-sm space-y-1'>
                        {section.links.map((link, i) => (
                            <li key={i}>
                                <a href='#' className='hover:underline transition text-emerald-600 hover:text-emerald-500'>{link}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
      </div>
      <p className='py-4 text-center text-sm md:text-base text-slate-500'>Copyright 2025, Blog-AI : All Right Reserved</p>
    </div>
  )
}

export default Footer
