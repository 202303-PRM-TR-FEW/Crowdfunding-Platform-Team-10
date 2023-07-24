import React from 'react'

const Footer = () => {
    return (
        <div className='justify-center flex border-t-[1px] border-basicgray '>
            <div className="p-10 text-center py-20 md:px-12 container w-screen">
                    <div className="grid grid-cols-2 md:grid-cols-4 justify-between gap-5">
                        <div className="text-center lg:text-left col-span-1">
                            <p className="header-5">Abous us</p>
                            <ul className='text-sm text-basicgray py-4 md:py-10 list-none'>
                                <li className='py-1'>Ayşe FullName</li>
                                <li className='py-1'>Bal FullName</li>
                                <li className='py-1'>Baris FullName</li>
                                <li className='py-1'>Mehmet FullName</li>
                                <li className='py-1'>ZainabFullName</li>
                            </ul>
                        </div>
                        <div className="text-center lg:text-left col-span-1">
                            <p className="header-5">Projects</p>
                            <ul className='text-sm text-basicgray py-4 md:py-10 list-none'>
                                <li className='py-1' >Project of the week</li>
                                <li className='py-1'>Last one</li>
                                <li className='py-1'>Last second</li>
                                <li className='py-1'>Last third</li>
                                <li className='py-1'>Last fourth</li>
                            </ul>
                        </div>
                        <div className=" text-center lg:text-left col-span-1">
                            <p className="header-5">Contact</p>
                            <ul className='text-sm text-basicgray py-4 md:py-10 list-none'>
                                <li className='py-1'>GitHub icon</li>
                                <li className='py-1'>LinkedIn icon</li>
                                <li className='py-1'>Instagram icon</li>
                            </ul>
                        </div>
                        <div className=" text-center lg:text-left col-span-1">
                            <p className="header-5">You need to sign in</p>
                            <ul className='text-sm text-basicgray py-4 md:py-10 list-none'>
                                <li className='py-1' >Go to join page</li>
                                <li className='py-1'>All projects</li>
                                <li className='py-1'>Comments</li>
                                <li className='py-1'>Countries</li>
                            </ul>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default Footer