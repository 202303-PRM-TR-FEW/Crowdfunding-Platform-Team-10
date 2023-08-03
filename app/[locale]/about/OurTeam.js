import React from 'react';
import Link from "next/link";
import { GitHub } from '@mui/icons-material';
import Image from 'next/image';


const OurTeam = () => {


  return (

    <div className="p-20 flex flex-col text-center lg:text-left container mx-auto">
      <p className="header-3Green pb-10">Our Team</p>
      <div className='flex flex-row flex-wrap gap-8 justify-center py-10'>
        <div className='group/item h-60 w-60 lg:h-80 lg:w-80 rounded transition ease-in-out hover:bg-gradient-to-t hover:from-black shadow-lg '>
          <div>
            <img src="https://avatars.githubusercontent.com/u/127213973?v=4" className='w-full -z-10 relative' alt="Avatar" />
          </div>
          <div className=' group/edit group-hover/item:visible relative invisible -top-16 lg:-top-20 text-center font-bold color-yellow text-base'>
            <p>Web Developer & Designer</p>
            <h1 className=' text-white md:text-lg lg:text-xl'>Ayşe Merve Kosova<span className='pl-3'><Link href="https://github.com/aysemerveksv" target="_blank" className='cursor-pointer'><GitHub /></Link></span> </h1>
          </div>
        </div>
        <div className='group/item h-60 w-60 lg:h-80 lg:w-80 rounded transition ease-in-out hover:bg-gradient-to-t hover:from-black shadow-lg '>
          <div>
            <img src="https://avatars.githubusercontent.com/u/86659887?v=4" className='w-full -z-10 relative' alt="Avatar" />
          </div>
          <div className=' group/edit group-hover/item:visible relative invisible -top-16 lg:-top-20 text-center font-bold color-yellow text-base'>
            <p>Web Developer & Designer</p>
            <h1 className=' text-white md:text-lg lg:text-xl'>Bal Elsada Hasun<span className='pl-3'><Link href="https://github.com/BalHasun" target="_blank" className='cursor-pointer'><GitHub /></Link></span> </h1>
          </div>
        </div>
        <div className='group/item h-60 w-60 lg:h-80 lg:w-80 rounded transition ease-in-out hover:bg-gradient-to-t hover:from-black shadow-lg ' >
          <div>
            <img src="https://avatars.githubusercontent.com/u/89347761?v=4" className='w-full -z-10 relative' alt="Avatar" />
          </div>
          <div className=' group/edit group-hover/item:visible relative invisible -top-16 lg:-top-20 text-center font-bold color-yellow text-base'>
            <p>Web Developer & Designer</p>
            <h1 className=' text-white md:text-lg lg:text-xl'>Sadik Baris Yilmaz<span className='pl-3'><Link href="https://github.com/sadikbarisyilmaz" target="_blank" className='cursor-pointer'><GitHub /></Link></span> </h1>
          </div>
        </div>
        <div className='group/item h-60 w-60 lg:h-80 lg:w-80 rounded transition ease-in-out hover:bg-gradient-to-t hover:from-black shadow-lg '>
          <div>
            <img src="https://avatars.githubusercontent.com/u/111579346?v=4" className='w-full -z-10 relative' alt="Avatar" />
          </div>
          <div className=' group/edit group-hover/item:visible relative invisible -top-16 lg:-top-20 text-center font-bold color-yellow text-base'>
            <p>Web Developer & Designer</p>
            <h1 className=' text-white md:text-lg lg:text-xl'>Mehmet Unlu<span className='pl-3'><Link href="https://github.com/mhmtnl" target="_blank" className='cursor-pointer'><GitHub /></Link></span> </h1>
          </div>
        </div>
        <div className='group/item h-60 w-60 lg:h-80 lg:w-80 rounded transition ease-in-out hover:bg-gradient-to-t hover:from-black shadow-lg '>
          <div>
            <img src="https://avatars.githubusercontent.com/u/76114995?v=4" className='w-full -z-10 relative' alt="Avatar" />
          </div>
          <div className=' group/edit group-hover/item:visible relative invisible -top-16 lg:-top-20 text-center font-bold color-yellow text-base'>
            <p>Web Developer & Designer</p>
            <h1 className=' text-white md:text-lg lg:text-xl'>Zainab Salah<span className='pl-3'><Link href="https://github.com/kainy01" target="_blank" className='cursor-pointer'><GitHub /></Link></span> </h1>
          </div>
        </div>
      </div>
      <p className='pt-5 pb-10 italic font-bold text-center text-base md:text-lg lg:text-xl text-basicgray'>If you would like to contact us, we are here</p>
    </div>
  )
}

export default OurTeam



