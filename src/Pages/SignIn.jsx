import React from 'react'
import { nilelogosolid } from '../assets'
import { Link } from 'react-router-dom'

const SignIn = () => {
  return (
    <>
        <div className='mt-28 mb-10'>
            <div>
                <img src={nilelogosolid} alt=""  className='flex justify-center mx-auto'/>
                <h1 className='text-[#333333] text-center text-[24px] font-bold mt-8'>Welcome To The Merchant Dashboard</h1>
            </div>

            <div className='flex justify-center mx-auto'>
                <form action="#" className='space-y-6 mt-6'>
                    <div>
                        <label htmlFor="EmailAddress" className="block text-[16px] font-bold text-[#333333]">
                        Email Address
                        </label>

                        <input
                        type="email"
                        id="EmailAddress"
                        name="email_address"
                        placeholder='Ashimiuade@gmail.com'
                        className="mt-1 w-[450px] p-3 rounded-md border-[#333333] border-2 bg-white text-sm text-gray-700 shadow-sm"
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
                        placeholder='*******'
                        className="mt-1 w-[450px] p-3 rounded-md border-[#333333] border-2 bg-white text-sm text-gray-700 shadow-sm"
                        />
                    </div>

                    <div className='flex items-center justify-center mx-auto gap-10'>
                        <div>
                            <label htmlFor="MarketingAccept" className="flex gap-1 items-center">
                            <input
                                type="checkbox"
                                id="MarketingAccept"
                                name="marketing_accept"
                                className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                            />

                            <span className="text-[14px] text-[#333333]">
                            Remember Me
                            </span>
                            </label>
                        </div>
                        <div className='flex items-center gap-1'>
                            <h1 className='text-[#333333] text-[14px]'>Forgotten Password ?</h1>
                            <Link to="/forgotpassword"><p className='text-[#000000] font-bold'>Click Here</p></Link>
                        </div>
                    </div>

                    <Link to="/dashboard">
                        <div className='mt-5'>
                            <button className='text-[#ffffff] bg-[#004324] w-full p-2 rounded-md'>Log In</button>
                        </div>
                    </Link>

                    <div className='flex items-center gap-1 justify-center mt-3'>
                        <h1 className='text-[#333333] text-[16px]'>Dont Have An Account ?</h1>
                        <Link to='/signup'>
                            <p className='text-[#000000] font-bold'>Click Here</p>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default SignIn