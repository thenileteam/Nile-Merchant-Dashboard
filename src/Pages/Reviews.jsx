/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link } from "react-router-dom";
import Links from "../Links";
import {
  image,
  nilelogowhite,
  notification,
  starhalf,
  starsquare,
  star,
  commentblock,
} from "../assets";
import ReviewTables from "../Components/Review/ReviewTables";
import PlaceholderImage from "../Components/PlaceholderImage/PlaceholderImage";
import Navbar from "@/Components/Navbar/Navbar";
import DashboardBox from "@/Components/Dashboard/DashboardBox";
import { useFetchUser } from "@/datahooks/users/userhooks";
import { useSidebarStore } from "@/ZustandStores/sidebarStore";
const Reviews = () => {
  const { user } = useFetchUser()
  const{isCollapsed} = useSidebarStore()
  return (
    <>
      <div className="bg-[#F5F5F5] pb-20">
        <div className="flex">
          {/* Navbar */}
          <div
            className={
              isCollapsed
                ? "flex-grow lg:ml-20 overflow-x-hidden"
                : "flex-grow lg:ml-56 overflow-x-hidden"
            }>
            <Navbar title="Reviews and Ratings" icon={starhalf} profilePic={user&&user.image?user.image:null} />

            {/* Cards */}
            <div className="p-6 mt-28 px-32">
              <div className="flex gap-8 lg:gap-20">
                <DashboardBox
                  text="Total Reviews"
                  bgColor="bg-[#FCDADF]"
                  image={starsquare}
                  // data={data?.length || 0}
                  imgWidth="w-9"
                  width="w-[50%]"
                />
                <DashboardBox
                  text="Top ratings"
                  bgColor="bg-[#FFE8DF]"
                  image={star}
                  // data={data?.length || 0}
                  imgWidth="w-9"
                  width="w-[50%]"
                />
                <DashboardBox
                  text="Excellence ratings"
                  bgColor="bg-[#FCDADF]"
                  image={star}
                  // data={data?.length || 0}
                  imgWidth="w-9"
                  width="w-[50%]"
                />
              </div>
            </div>

            {false&&
              <div className="px-24 mt-20">
                <div>
                  <img
                    src={commentblock}
                    alt=""
                    className="flex justify-center mx-auto"
                  />
                  <h1 className="text-[24px] font-extrabold text-center">
                    You’ll Hear Your Customer’s <br /> Voices Here
                  </h1>
                  <p className="text-[#6E6E6E] font-bold text-center">
                    When your customers give feedbacks on <br /> your product it
                    will show here and you’ll <br /> be notified
                  </p>
                </div>
                <div className="flex justify-center mt-3">
                  <button className="text-[#ffffff] bg-[#004324] p-3 font-bold rounded-md">
                    Check Your Customers
                  </button>
                </div>
              </div>
            }
            
              <div>
                <ReviewTables />
              </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Reviews;
