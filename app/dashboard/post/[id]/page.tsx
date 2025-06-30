import React from 'react'
import EditPost from './editPost'

const EditPostPage = async ({params}: {params: Promise<{id: string}>}) => {
    const { id } = await params;
  return (
    <div>
      <EditPost paramsId={id} />
    </div>
  )
}

export default EditPostPage
