import React from 'react'

const Comments = () => {
  return (
    <div className="p-10 text-center py-20 md:px-12 container mx-auto">
      <div className="flex items-center flex-col py-5 ">
        <p className='w-[24rem] text-sm text-black py-5 italic'>- This website rocks! I raised close to $10,000 in less than 48 hours for my nephew’s medical needs, and your customer service was so prompt and helpful. -</p>
        <img className="w-24 h-24 rounded-full" src="https://firebasestorage.googleapis.com/v0/b/crowdfunding-99b5a.appspot.com/o/hero.png?alt=media&token=f25e81a6-bb2e-4797-b4b0-a03d495988bb" alt=""></img>
        <p className='header-5 pt-3'>Monica S.</p>
        <p className= "text-sm text-basicgray pt-1">Raised $16,000 on OpenHand</p>
      </div>
    </div>
  )
}

export default Comments




