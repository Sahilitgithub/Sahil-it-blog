"use client"
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

const PostsItem = () => {
  return (
    <article>
      <Link href={`/post/12223`}>
      <div className='bg-[#001021] box-shadow text-white rounded-md p-2'>
      <figure>
        <Image src={'/images/slide-1.png'} alt='Posts item' className='w-full h-[200px] rounded-md' width={500} height={400} />
      </figure>
      <span className='text-sm bg-slate-600 rounded'>20/12/2025</span>
      <h2 className='text-amber-600 text-[17px] lg:text-[18px]'>this is post title ...</h2>
      <p className='text-slate-400 text-sm text-start'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi maiores quis minust...</p>
    </div>
      </Link>
    </article>
  )
}

export default PostsItem
