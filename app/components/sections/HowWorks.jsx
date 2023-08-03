import React from 'react'
import DoneIcon from '@mui/icons-material/Done';

const HowWorks = () => {
  return (
    <div className="bg-gradient-to-t from-transparent to-teal-50 ">
      <section className="container mx-auto flex flex-col text-center p-2  md:text-left items-center justify-center pt-28 pb-20 
        bg-[length:200px_200px] bg-[right_top_2rem] bg-no-repeat bg-[url('https://firebasestorage.googleapis.com/v0/b/crowdfunding-99b5a.appspot.com/o/dots.svg?alt=media&token=7a903a0a-56f7-4321-8497-13b2325a2477')]
      " >
        <p className='header-3'>How <span className="color-green">Open<span className="text-[#1f9e92]">Handed</span></span> Works</p>
        <p className="text-sm color-grey py-2 text-center">With just a few minute you can fundraise</p>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:gap-16 gap-10 md:mt-20 mt-10 mx-5 md:mx-0'>
          <div className='group gr col-span-1 w-full grid grid-cols-1 items-center '>
            <div className='col-span-1 flex md:flex-row flex-col justify-between items-center'>
              <div className="lg:w-14 lg:h-14 w-8 h-8 rounded-full bg-[#f0bd07] flex justify-center items-center mb-5 group-hover:bg-[#00c1a2] group-hover:scale-[1.3] transition duration-700 ease-in-out">
                <p className='header-3 mt-1 text-white'>1</p>
              </div>
              <div className='hidden lg:inline-block border-dotted border-t-8 border-[#f0bd07] lg:w-48 xl:w-60 2xl:w-72 mb-5 group-hover:border-[#00c1a2] transition duration-700 ease-in-out'></div>
            </div>
            <div className='col-span-1'>
              <p className='header-4'>Begin with the basic things</p>
              <ul className='mt-3 ml-10 md:ml-5 text-left'>
                <li className='sub-header flex items-start space-x-3'><DoneIcon className='text-[#00c1a2] mt-1' /><span>Introduce yourself, your plan and where the place is</span></li>
              </ul>
            </div>
          </div>
          <div className='group col-span-1 w-full grid grid-cols-1'>
            <div className='col-span-1 flex md:flex-row flex-col justify-between items-center'>
              <div className="lg:w-14 lg:h-14 w-8 h-8 rounded-full bg-[#f0bd07] flex justify-center items-center mb-5 group-hover:bg-[#00c1a2] group-hover:scale-[1.3] transition duration-700 ease-in-out">
                <p className='header-3 mt-1 text-white'>2</p>
              </div>
              <div className='hidden lg:inline-block border-dotted border-t-8 border-[#f0bd07] lg:w-48 xl:w-60 2xl:w-72 mb-5 group-hover:border-[#00c1a2] transition duration-700 ease-in-out'></div>
            </div>
            <div className='col-span-1'>
              <p className='header-4'>Tell about your idea and event</p>
              <ul className='mt-3 ml-10 md:ml-5 text-left'>
                <li className='sub-header flex items-start space-x-3'><DoneIcon className='text-[#00c1a2] mt-1' /><span>Along the way, we will provide advice to help you</span></li>
              </ul>
            </div>
          </div>
          <div className='group col-span-1 w-full grid grid-cols-1'>
            <div className='col-span-1 flex md:flex-row flex-col justify-start items-center'>
              <div className="lg:w-14 lg:h-14 w-8 h-8 rounded-full bg-[#f0bd07] flex justify-center items-center mb-5 group-hover:bg-[#00c1a2] group-hover:scale-[1.3] transition duration-700 ease-in-out">
                <p className='header-3 mt-1 text-white'>3</p>
              </div><span className='invisible lg:visible lg:inline-block text-[#f0bd07] -mt-8 scale-[4] ml-14 group-hover:scale-[6] group-hover:translate-x-6 group-hover:text-[#00c1a2] transition duration-700 ease-in-out'><DoneIcon /></span>

            </div>
            <div className='col-span-1'>
              <p className='header-4'>Share with friends and family</p>
              <ul className='mt-3 ml-10 md:ml-5 text-left'>
                <li className='sub-header flex items-start space-x-3'><DoneIcon className='text-[#00c1a2] mt-1' /><span>There are many people who want to help you as well</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>

  )
}

export default HowWorks
