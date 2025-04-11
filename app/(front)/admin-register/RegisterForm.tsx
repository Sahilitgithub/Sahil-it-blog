"use client";
import Link from "next/link";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface RegisterTypes {
    name: string;
    email: string;
    password: string;
}

const RegisterForm = () => {
  const router = useRouter();
  const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<RegisterTypes>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const formSubmit: SubmitHandler<RegisterTypes> = async (form) => {
    try {
      const response = await axios.post("/api/register", form);
      if(response.status === 201) {
        toast.success("Register is successfully registered");
        return router.push("/dashboard");
      }else if(response.status === 400) {
        toast.error("User already registered");
      }
    } catch (error: unknown) {
      if(axios.isAxiosError(error)){
        toast.error(error.response?.data.errors);
      }
    }
  }
  
  return (
    <section className="flex justify-center items-center">
        <div className="p-2 sm:p-5 bg-black bg-opacity-50 rounded-lg w-80 mt-10 shadow-lg">
            <h1 className="text-sky-700 text-[18px] sm:text-[20px] font-semibold text-center">Admin Register</h1>
            <form onSubmit={handleSubmit(formSubmit)} className="mt-3 text-white">
                <div className="my-2">
                    <label htmlFor="Name" aria-label="name" className="text-[15px] sm:text-[16px]">Name</label>
                    <input 
                    type="text" 
                    {...register("name", { required: "Name is required" })}
                    className="w-full p-[10px] rounded-md border bg-[#000119] border-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-700 focus:border-transparent text-[14px] sm:text-[15px]" 
                    placeholder="Enter Name" />
                    {errors.name?.message && <span role="alert" className="text-[12px] sm:text-[13px] text-red-700">{errors.name.message}</span>}
                </div>
                <div className="my-2">
                    <label htmlFor="Email" aria-label="email" className="text-[15px] sm:text-[16px]">Email</label>
                    <input 
                    type="email" 
                    {...register("email", { required: "Email is required", pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Email is invalid",
                    }})}
                    className="w-full p-[10px] rounded-md border bg-[#000119] border-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-700 focus:border-transparent text-[14px] sm:text-[15px]" 
                    placeholder="Enter Email" />
                    {errors.email?.message && <span role="alert" className="text-[12px] sm:text-[13px] text-red-700">{errors.email.message}</span>}
                </div>
                <div className="my-2">
                    <label htmlFor="Password" aria-label="Password" className="text-[15px] sm:text-[16px]">Password</label>
                    <input 
                    type="password"  
                    {...register("password", { 
                      required: "Password is required",
                      minLength: {
                        value: 4,
                        message: "Password must be at least 4 characters long"
                      },
                      maxLength: {
                        value: 16,
                        message: "Password must be at most 16 characters long"
                      }
                    })}
                    className="w-full p-[10px] rounded-md border bg-[#000119] border-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-700 focus:border-transparent text-[14px] sm:text-[15px]" 
                    placeholder="Enter Password"
                    autoComplete="off"
                    aria-describedby="password-error" />
                    {errors.password?.message && <span role="alert" className="text-[12px] sm:text-[13px] text-red-700">{errors.password.message}</span>}
                </div>
                <div className="my-2 text-center">
                    <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-sky-600 p-2 w-full rounded-md">{isSubmitting ? "Register...": "Register"}</button>
                </div>
                <div className="my-2">
                  <p className="text-[14px] sm:text-[15px]">Already have an account?<Link href="/admin-login" className="underline text-blue-700 pl-[1px]">Login</Link></p>
                </div>
            </form>
        </div>
    </section>
  )
}

export default RegisterForm
