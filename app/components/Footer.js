import React from 'react'
import Link from 'next/link'

const Footer = () => {

    return (
        <div className='justify-center flex border-t-[1px] border-basicgray mx-5 md:mx-0 '>
            <div className=" pt-20 pb-10 md:px-12 container w-screen">
                <div className="text-center md:text-left grid grid-cols-2 md:grid-cols-4 justify-between gap-10 lg:gap-16">
                    <div className=" col-span-2">
                        <p className="header-3 color-green">Open<span className="text-[#1f9e92]">Handed</span></p>
                        <p className='text-sm text-basicgray py-4 md:py-10'>Bring your ideas to life right away! Create a project to fundraise money for your ideal endeavor, or donate to causes that interest you to make a difference.<br />
                            <Link href="/about"><span className='font-bold transition duration-300 ease-in-out hover:text-lightGreen'>Read more...</span></Link> </p>
                    </div>
                    <div className='col-span-2 grid-cols-3 grid'>
                        <div className='col-span-1'>
                            <p className='header-5'>Team</p>
                            <Link href="/about">
                                <ul className='text-sm text-basicgray py-4 md:py-10 list-none transition hover:text-lightGreen duration-300 ease-in-out inline-block'>
                                    <li className='py-1 '>Ayşe Merve Kosova</li>
                                    <li className='py-1 '>Bal Elsada Hasun</li>
                                    <li className='py-1 '>Sadik Baris Yilmaz</li>
                                    <li className='py-1 '>Mehmet Unlu</li>
                                    <li className='py-1 '>Zainab Salah</li>
                                </ul>
                            </Link>
                        </div>
                        <div className='col-span-1 lg:ml-5'>
                            <p className='header-5'>Links</p>
                            <ul className='text-sm text-basicgray py-4 md:py-10 list-none'>
                                <Link href="/"><li className='py-1 transition hover:text-lightGreen duration-300 ease-in-out'>Home</li></Link>
                                <Link href="/projects"><li className='py-1 transition hover:text-lightGreen duration-300 ease-in-out'>Projects</li></Link>
                            </ul>
                        </div>
                        <div className='col-span-1'>
                            <p className='header-5'>Join</p>
                            <ul className='text-sm text-basicgray py-4 md:py-10 list-none'>
                                <li className='py-1'>
                                    <Link href="/signup" className="bg-lightGreen hover:bg-[#f0bd07] shadow-lg text-white text-sm py-1 px-2 rounded-md text-center cursor-pointer transition-all duration-300 ease-in-out">Log in</Link></li>
                                <Link href="/profile" ><li className='py-1 transition hover:text-lightGreen duration-300 ease-in-out'>Profile</li></Link>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer