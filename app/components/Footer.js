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
                            <ul className='text-sm text-basicgray py-4 md:py-10 list-none inline-block'>
                                <Link href="https://github.com/aysemerveksv" target="_blank"  ><li className='py-1 transition hover:text-lightGreen duration-300 ease-in-out'>Ayşe Merve Kosova</li></Link>
                                <Link href="https://github.com/BalHasun" target="_blank" ><li className='py-2 transition hover:text-lightGreen duration-300 ease-in-out'>Bal Elsada Hasun</li></Link>
                                <Link href="https://github.com/sadikbarisyilmaz" target="_blank" ><li className='py-1 transition hover:text-lightGreen duration-300 ease-in-out'>Sadik Baris Yilmaz</li></Link>
                                <Link href="https://github.com/mhmtnl" target="_blank" ><li className='py-2 transition hover:text-lightGreen duration-300 ease-in-out'>Mehmet Unlu</li></Link>
                                <Link href="https://github.com/kainy01" target="_blank" ><li className='py-1 transition hover:text-lightGreen duration-300 ease-in-out'>Zainab Salah</li></Link>
                            </ul>
                        </div>
                        <div className='col-span-1 lg:ml-5'>
                            <p className='header-5'>Links</p>
                            <ul className='text-sm text-basicgray py-4 md:py-10 list-none'>
                                <Link href="/"><li className='py-1 transition hover:text-lightGreen duration-300 ease-in-out'>Home</li></Link>
                                <Link href="/projects"><li className='py-2 transition hover:text-lightGreen duration-300 ease-in-out'>Projects</li></Link>
                            </ul>
                        </div>
                        <div className='col-span-1'>
                            <p className='header-5'>Join</p>
                            <ul className=' py-4 md:py-10 list-none'>
                                <li className='py-1'>
                                    <Link href="/signup" className="btn-primary">Log in</Link></li>
                                <Link href="/profile" ><li className='py-2 transition hover:text-lightGreen duration-300 ease-in-out text-sm text-basicgray'>Profile</li></Link>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer