"use client"
import { PostTypes } from '@/utils/data'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

interface PostsProps {
  posts: PostTypes;  // PropTypes.shape({...Product }) is a type-checking prop type for 'products'
}

const PostsItem = ({posts}: PostsProps) => {
  return (
    <article>
      <Link href={`/post/${posts.id}`}>
      <div className='bg-[#001021] box-shadow text-white rounded-md p-2'>
      <figure>
        <Image src={posts.image} alt='Posts item' className='w-full h-[200px] rounded-md' width={500} height={400} />
      </figure>
      <span className='text-sm bg-slate-600 rounded'>{posts.date}</span>
      <h2 className='text-amber-600 text-[17px] lg:text-[18px]'>{posts.title.slice(0, 40)}...</h2>
      <p className='text-slate-400 text-sm text-start'>{posts.description.slice(0, 80)}...</p>
    </div>
      </Link>
    </article>
  )
}

export default PostsItem
