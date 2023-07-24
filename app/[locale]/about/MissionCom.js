import React from 'react'


const MissionCom = () => {
    return (
        <div className='bg-gray-100 justify-center flex'>
            <section className="p-10 text-center py-20 md:px-12 container ">
                <p className="text-xl md:text-2xl lg:text-3xl text-lightGreen font-bold pb-10 text-center ">Our Mission</p>
                <div className="grid grid-cols-1 lg:grid-cols-2 justify-between gap-20 ">
                    <div className="text-center lg:text-left col-span-1">
                        <p className="header-3">Making life standards better for everyone and everything </p>
                        <p className="sub-header py-10">
                            We help people achieve independence by making starting, running, and growing a business easier. We believe the future of commerce has more voices, not fewer, so we are reducing the barriers to business ownership to make commerce better for everyone.
                        </p>
                    </div>
                    <div className=" text-center lg:text-right col-span-1">
                        <p className="header-3">Being the voice of those who need a help </p>
                        <p className="sub-header py-10">
                            We help people achieve independence by making starting, running, and growing a business easier. We believe the future of commerce has more voices, not fewer, so we are reducing the barriers to business ownership to make commerce better for everyone.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default MissionCom
