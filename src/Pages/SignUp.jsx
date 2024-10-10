import React from 'react'
import { nilelogosolid } from '../assets'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <>
        <div className='mt-10 mb-10'>
            <div>
                <img src={nilelogosolid} alt="" className='flex justify-center mx-auto'/>
                <h1 className='text-[#333333] text-center text-[24px] font-bold mt-8'>Create Your Store Owner Account</h1>
                <p className='text-center text-[#333333] text-[20px] font-semibold'>Join Our platform And Start Managing Your Store Effortlessly!</p>
            </div>

            <div className='flex justify-center mx-auto'>
                <form action="#" className='space-y-6 mt-6'>
                    <div>
                        <label htmlFor="FullName" className="block text-[16px] font-bold text-[#333333]">
                        Full Name
                        </label>

                        <input
                        type="text"
                        id="FullName"
                        name="full_name"
                        placeholder='Enter your Full Name'
                        className="mt-1 w-full p-3 rounded-md border-[#333333] border-2 bg-white text-sm text-gray-700 shadow-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="EmailAddress" className="block text-[16px] font-bold text-[#333333]">
                        Email Address
                        </label>

                        <input
                        type="email"
                        id="EmailAddress"
                        name="email_address"
                        placeholder='Enter your Email Address'
                        className="mt-1 w-full p-3 rounded-md border-[#333333] border-2 bg-white text-sm text-gray-700 shadow-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="Password" className="block text-[16px] font-bold text-[#333333]">
                        Password
                        </label>

                        <input
                        type="password"
                        id="Password"
                        name="password"
                        placeholder='********'
                        className="mt-1 w-full p-3 rounded-md border-[#333333] border-2 bg-white text-sm text-gray-700 shadow-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="RepeatPassword" className="block text-[16px] font-bold text-[#333333]">
                        Repeat Password
                        </label>

                        <input
                        type="password"
                        id="RepeatPassword"
                        name="repeat_password"
                        placeholder='********'
                        className="mt-1 w-full p-3 rounded-md border-[#333333] border-2 bg-white text-sm text-gray-700 shadow-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="StoreName" className="block text-[16px] font-bold text-[#333333]">
                        Store Name
                        </label>

                        <input
                        type="text"
                        id="store_name"
                        name="storename"
                        placeholder='Enter Your Store Name'
                        className="mt-1 w-full p-3 rounded-md border-[#333333] border-2 bg-white text-sm text-gray-700 shadow-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="ProfileImage" className="block text-[16px] font-bold text-[#333333]">
                            Add Profile Image
                        </label>

                        <div className="mt-1 w-[450px]">
                            <label
                            htmlFor="ProfileImage"
                            className="block w-full p-3 text-sm text-gray-400 bg-white border-[#333333] border-2 rounded-md cursor-pointer shadow-sm"
                            >
                            Choose Image
                            </label>

                            <input
                            type="file"
                            id="ProfileImage"
                            name="profile_image"
                            accept="image/*"
                            className="hidden"
                            />
                        </div>
                    </div>
                    <div className="mx-auto justify-center flex">
                        <label htmlFor="MarketingAccept" className="flex gap-1">
                        <input
                            type="checkbox"
                            id="MarketingAccept"
                            name="marketing_accept"
                            className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                        />

                        <span className="text-[14px] text-[#333333]">
                         Agreed To The Terms And Conditions
                        </span>
                        </label>
                    </div>

                    <Link to="/dashboard">
                        <div className='mt-5'>
                            <button className='text-[#ffffff] bg-[#004324] w-full p-2 rounded-md'>Sign Up</button>
                        </div>
                    </Link>
                </form>
            </div>
        </div>
    </>
  )
}

export default SignUp