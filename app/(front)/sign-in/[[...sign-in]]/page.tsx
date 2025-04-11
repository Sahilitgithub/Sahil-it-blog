import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return <div className='flex justify-center my-10 min-h-72'>
    <SignIn />
  </div>
}