import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-gray-950 text-white px-4 p-2 flex justify-between items-center'> 
      <div className='w-72'>
        <input type="search" placeholder='Search here' className='w-full h-full p-3 rounded-md bg-slate-900'  />
      </div>
      <figure className='w-10 h-10'>
        <Image src={'/images/avatar.png'} alt='Admin Avatar' width={50} height={50} className='rounded-full w-full h-full' />
      </figure>
    </nav>
  )
}

export default Navbar
