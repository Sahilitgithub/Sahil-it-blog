import { prisma } from '@/utils/prisma/prismaClient'
import React from 'react'

const Users = async () => {
    const users = await prisma.user.findMany()
  return (
    <div className='min-h-screen mt-2 text-white'>
      Users: <br />
        {JSON.stringify(users)}
    </div>
  )
}

export default Users
