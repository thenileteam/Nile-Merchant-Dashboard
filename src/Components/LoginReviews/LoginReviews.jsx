import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { tadfarm, wuraolaImg, donBaci, dot1, dot2, dot3 } from "../../assets";
import {wuraolaImg, donBaci, tadfarm, dot1, dot2, dot3 } from "../../assets";

const reviews = [
  {
    text:  "With Nile, I finally have clarity on our cash flow. It’s been a game-changer for NUFI Agro",
    author: "Ogungbola Ayeni-Wuraola - CEO, NUFI Agro",
    img: wuraolaImg,
    slide: dot1,
  },
  {
    text: "Nile transformed how we handle finances. It's simple, efficient, and made just for businesses like ours.",
    author: "Blessing Dion Baci - CEO, Dion Baci Limited",
    img: donBaci,
    slide: dot2,
  },
  {
    text:  "Tracking payments and inventory has never been this easy. Nile is a true partner for my business.",
    author: "Titilayo Aisha Damilola - CEO, Tad Farms",
    img: tadfarm,
    slide: dot3,
  },
];

const LoginReviews = () => {
  const [currentReview, setCurrentReview] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 3000); // Change review every 3 secs
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative hidden lg:flex ">
      <motion.div
        key={currentReview}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <img src={reviews[currentReview].img} className="w-[520px] h-[650px] object-cover rounded-lg" loading="lazy" alt="lady smiling" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-800 via-transparent to-slate-800 opacity-50 rounded-lg"></div>
        <div className="text-white absolute bottom-[120px] left-16 right-16">
          <p className="font-bold">{reviews[currentReview].text}</p>
          <h4 className="mt-2">{reviews[currentReview].author}</h4>
        </div>
          <img className="absolute  bottom-14 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            src={reviews[currentReview].slide}
          alt={`slide${currentReview}`}
          loading="lazy"
          />
      </motion.div>
    </div>
  );
};

export default LoginReviews;
