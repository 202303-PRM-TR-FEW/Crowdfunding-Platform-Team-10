import React from 'react'

const OurTeam = () => {


  return (
  
    <div className="p-20 flex flex-col text-center lg:text-left container mx-auto">
      <p className="header-3Green">Our Team</p>
      <div className='flex flex-row flex-wrap gap-8 justify-center py-10'>
        <div className='h-60 w-60 lg:h-80 lg:w-80 rounded transition ease-in-out hover:bg-gradient-to-t hover:from-white duration-700'>
          <div className=''>
            <img src="https://avatars.githubusercontent.com/u/127213973?v=4" className='w-full -z-10 relative' alt="Avatar"/>
          </div>
          <div className='relative hover:visible -top-24 text-center  text-base  text-basicgray' id='hovered'>
            <h1 className='font-bold   text-lightGreen'>Ayşe Merve Kosova</h1>
            <p>Web Developer & Designer</p>
            <p>Icons - profiles</p>
          </div>
        </div>
        <div className='h-60 w-60 lg:h-80 lg:w-80 rounded transition ease-in-out hover:bg-gradient-to-t hover:from-white duration-700'>
          <div>
            <img src="https://avatars.githubusercontent.com/u/86659887?v=4"className='w-full -z-10 relative' alt="Avatar"/>
          </div>

        </div>
        <div className='h-60 w-60 lg:h-80 lg:w-80 rounded transition ease-in-out hover:bg-gradient-to-t hover:from-white duration-700' >
          <div>
            <img src="https://avatars.githubusercontent.com/u/89347761?v=4"className='w-full -z-10 relative' alt="Avatar"/>
          </div>

        </div>
        <div className='h-60 w-60 lg:h-80 lg:w-80 rounded transition ease-in-out hover:bg-gradient-to-t hover:from-white duration-700'>
          <div>
            <img src="https://avatars.githubusercontent.com/u/111579346?v=4"className='w-full -z-10 relative' alt="Avatar"/>
          </div>

        </div>
        <div className='h-60 w-60 lg:h-80 lg:w-80 rounded transition ease-in-out hover:bg-gradient-to-t hover:from-white duration-700'>
          <div>
            <img src="https://avatars.githubusercontent.com/u/76114995?v=4"className='w-full -z-10 relative' alt="Avatar"/>
          </div>

        </div>
      </div>
      <p className='pt-5 pb-10 italic font-bold text-center text-base md:text-lg lg:text-xl text-basicgray'>If you would like to contact us, we are here</p>
    </div>
  )
}

export default OurTeam



