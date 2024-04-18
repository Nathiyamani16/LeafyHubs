import React, { useState } from "react";
import {motion} from "framer-motion"
import { Fadeinout } from "../Animation";

const Logininput = ({
  placeholder,
  icon,
  inputState,
  inputStateFun,
  type,
  isSignUp,
}) => {
  const [Focus,setFocus]=useState(false);
  return (
    < motion.div {...Fadeinout}

      className={`flex items-center justify-center gap-4 bg-block backdrop-blur-md rounded-md w-full px-4 py-2
      ${Focus? "shadow-md shadow-green-300" : "shadow-none"}`}
    >
      {/* Your input element here */}
      {icon}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full h-full bg-transparent 
      text-lg font-semibold border-none outline-none"
        value={inputState}
        onChange={(e) => inputStateFun(e.target.value)}
        onFocus={()=>setFocus(true)}
        onBlur={()=> setFocus(false)}
      />
    </ motion.div>
  );
};

export default Logininput;
