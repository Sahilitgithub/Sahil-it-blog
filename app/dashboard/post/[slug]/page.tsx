import EditPost from "./editPost"


const PostEditPage = ({params}: {params: {slug: number}}) => {
  return (
    <main className="px-4 p-2">
      <EditPost paramsId={params.slug.toString()} />
    </main>
  )
}

export default PostEditPage
