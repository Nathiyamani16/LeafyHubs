import { motion } from "framer-motion";
import React from "react";

const HomeSlider = () => {
  return (
    <motion.div className="w-full flex flex-col justify-start items-start">
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col items-start justify-start gap-1">
          <p className="text-2xl text-headingColor font-bold">
            Our Fresh & Healthy Fruits
          </p>
          <div className="w-40 h-1 rounded-md bg-red-500"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default HomeSlider;
