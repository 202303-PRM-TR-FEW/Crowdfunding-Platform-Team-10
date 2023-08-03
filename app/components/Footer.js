import React from 'react'
import Link from 'next/link' 
import { GitHub } from '@mui/icons-material';

const Footer = () => {

    return (
        <div className='justify-center flex border-t-[1px] border-basicgray mx-5 md:mx-0 '>
            <div className=" py-20 md:px-12 container w-screen">
                <div className="text-center md:text-left grid grid-cols-1 md:grid-cols-4 justify-between gap-10 lg:gap-16">
                    <div className=" md:col-span-2 col-span-1">
                        <p className="header-3 color-green">Open<span className="text-[#1f9e92]">Handed</span></p>
                        <p className='text-sm text-basicgray py-4 md:py-10'>Bring your ideas to life right away! Create a project to fundraise money for your ideal endeavor, or donate to causes that interest you to make a difference.<span className='font-bold cursor-pointer transition duration-300 ease-in-out hover:text-lightGreen'>Read more...</span></p>
                    </div>
                    <div className='col-span-1'>
                        <p className='header-5'>Contact <GitHub className='scale-[0.8] -mt-1 ml-2 '/></p>
                        <ul className='text-sm text-basicgray py-4 md:py-10 list-none inline-grid grid-cols-2 gap-3'>
                            <li className='py-1 '>Ayşe Merve Kosova</li>
                            <li className='py-1 '>Bal Elsada Hasun</li>
                            <li className='py-1 '>Sadik Baris Yilmaz</li>
                            <li className='py-1 '>Mehmet Unlu</li>
                            <li className='py-1 '>Zainab Salah</li>
                        </ul>
                    </div>
                    <div className='col-span-1'>
                        <p className='header-5'>Links</p>
                        <ul className='text-sm text-basicgray py-4 md:py-10 list-none inline-grid grid-cols-2 gap-3'>
                            <li className='py-1'>Home</li>
                            <li className='py-1'>Projects</li>
                            <li className='py-1'>About us</li>
                            <li className='py-1'>Profile</li>
                        </ul>
                    </div>
 
                </div>
            </div>
        </div>
    )
}

export default Footer