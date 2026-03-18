import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onTouched' });

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert('success');
    console.log('Form data', data);
    reset();
  };
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-xl shadow-2xl">
      <div className="text-center mt-5">
        <h1 className="text-3xl font-bold">Create Account</h1>
        <h2 className="text-slate-400">
          Already have an account?{' '}
          <span className=" text-blue-500 text-sm underline">Login</span>
        </h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className=" m-10">
        <div>
          <div
            className={`flex relative justify-center  items-center border border-white/10 rounded-sm p-1  bg-white/5 transition-colors ${errors?.username ? 'focus-within:border-red-500' : 'focus-within:border-blue-500'}`}
          >
            <User className=" absolute left-1" />
            <input
              {...register('username', {
                required: 'Name is required',
                minLength: { value: 3, message: 'Minimum 3 characters' },
              })}
              type="text"
              placeholder="Full Name"
              className=" ml-8 text-xl outline-none   "
            />
          </div>
          <div className="ml-1 min-h-5 text-sm text-red-500">
            {errors.username && errors.username.message
              ? errors.username.message
              : ''}
          </div>
        </div>
        <div>
          <div
            className={`flex relative justify-center  items-center border border-white/10 rounded-sm p-1  bg-white/5 transition-colors ${errors?.useremail ? 'focus-within:border-red-500' : 'focus-within:border-blue-500'}`}
          >
            <Mail className=" absolute left-1" />
            <input
              {...register('useremail', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
              })}
              type="email"
              placeholder="Email"
              className=" ml-8 text-xl outline-none "
            />
          </div>
          <div className="ml-1 min-h-5 text-sm text-red-500">
            {errors.useremail && errors.useremail.message
              ? errors.useremail.message
              : ''}
          </div>
        </div>
        <div>
          <div
            className={`flex relative justify-center  items-center border border-white/10 rounded-sm p-1  bg-white/5 transition-colors ${errors?.userpassword ? 'focus-within:border-red-500' : 'focus-within:border-blue-500'}`}
          >
            <Lock className=" absolute left-1" />
            <input
              {...register('userpassword', {
                required: 'Password is required',
                minLength: { value: 8, message: 'Password is too short' },
              })}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className=" ml-8 text-xl outline-none "
            />
            <div className=" absolute right-1 cursor-pointer">
              {' '}
              {showPassword ? (
                <EyeOff onClick={() => setShowPassword(false)} />
              ) : (
                <Eye onClick={() => setShowPassword(true)} />
              )}
            </div>
          </div>
          <div className="ml-1 min-h-5 text-sm text-red-500">
            {errors.userpassword && errors.userpassword.message
              ? errors.userpassword.message
              : ''}
          </div>
        </div>
        <div className="">
          <div className="flex gap-1 items-center">
            <input
              {...register('terms', {
                required: 'You must agree to the terms',
              })}
              type="checkbox"
              className="cursor-pointer"
            />
            <p>Terms & Conditions</p>
          </div>
          <div className="ml-1 min-h-5 text-sm text-red-500">
            {errors.terms && errors.terms.message ? errors.terms.message : ''}
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full mt-2 rounded-md py-2 font-bold bg-linear-to-r from-cyan-500 to-blue-600 ${isSubmitting ? ' opacity-50 cursor-not-allowed' : ' opacity-100 cursor-pointer'}`}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
