import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { loginReview, loginReview2, dot1, dot2, dot3 } from "../../assets";

const reviews = [
  {
    text: "What i love about Nile is how easy it is to manage everything from one dashboard. From payment processing to order management, they have it all covered. Highly recommended.",
    author: "Jessica R -  Founder Of EcoTote",
    img: loginReview,
    slide: dot1,
  },
  {
    text: " The customizable templates and marketing tools on Nile helped me build a professional-looking store without hiring a designer. Sales have increased by 40% since i switched  to Nile.",
    author: "Mena E - Owner Of Mybeads.ng",
    img: loginReview2,
    slide: dot2,
  },
  {
    text: "Nile made launching my online store a breeze! I had no prior experience with building websites, but with their intuitive platform. It’s been a game changer for my business.",
    author: "Ekeh Ukem - CEO Of Chicky Fits.",
    img: loginReview,
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
    <div className="relative hidden md:block">
      <motion.div
        key={currentReview}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <img src={reviews[currentReview].img} alt="lady smiling" />
        <div className="text-white absolute bottom-[120px] left-16 right-16">
          <p className="font-bold">{reviews[currentReview].text}</p>
          <h4 className="mt-2">{reviews[currentReview].author}</h4>
        </div>
          <img className="absolute bottom-14 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            src={reviews[currentReview].slide}
            alt={`slide${reviews[currentReview]}`}
          />
      </motion.div>
    </div>
  );
};

export default LoginReviews;
