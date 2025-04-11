"use client";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
interface LoginTypes {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { register, handleSubmit, formState: {errors, isSubmitting}} = useForm<LoginTypes>({
    defaultValues: {email: '', password: ''},
  });

  const formSubmit: SubmitHandler<LoginTypes> = async (form) => {
    console.log(form);
  }
  return (
    <section className="flex justify-center items-center">
        <div className="p-2 sm:p-5 bg-black bg-opacity-50 rounded-lg w-80 mt-10">
            <h1 className="text-sky-700 text-[18px] sm:text-[20px] font-semibold text-center">Admin Login</h1>
            <form onSubmit={handleSubmit(formSubmit)} className="mt-3 text-white">
                <div className="my-2">
                    <label htmlFor="Email" aria-label="email" className="text-[15px] sm:text-[16px]">Email</label>
                    <input 
                    type="email" 
                    {...register("email", { required: "Email is required", pattern:{
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Email is invalid",
                    } })}
                    className="w-full p-[10px] rounded-md border bg-[#000119] border-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-700 focus:border-transparent text-[14px] sm:text-[15px]" 
                    placeholder="Enter Email" />
                    {errors.email?.message && <span className="text-[12px] sm:text-[13px] text-red-700">{errors.email.message}</span>}
                </div>
                <div className="my-2">
                    <label htmlFor="Password" aria-label="Password" className="text-[15px] sm:text-[16px]">Password</label>
                    <input 
                    type="password"  
                    {...register("password", { required: "Password is required" })}
                    
                    className="w-full p-[10px] rounded-md border bg-[#000119] border-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-700 focus:border-transparent text-[14px] sm:text-[15px]" 
                    placeholder="Enter Password" />
                    {errors.password?.message && <span className="text-[12px] sm:text-[13px] text-red-700">{errors.password.message}</span>}
                </div>
                <div className="my-2 text-center">
                    <button 
                    type="submit"
                    disabled={isSubmitting} 
                    className="bg-sky-600 p-2 w-full rounded-md"> {isSubmitting ? "Login..." : "Login"}</button>
                </div>
                <div className="my-2">
                  <p className="text-[14px] sm:text-[15px]">Don{"'"}t have an account?<Link href="/admin-register" className="underline text-blue-700 pl-[1px]">Register</Link></p>
                </div>
            </form>
        </div>
    </section>
  )
}

export default LoginForm