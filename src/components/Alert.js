import React from 'react'
import { motion } from "framer-motion"
import { Fadeinout } from '../Animation'
import { BsPatchCheckFill } from "react-icons/bs";
import { IoWarningOutline } from "react-icons/io5";
import { BiSolidAngry } from "react-icons/bi";
import { ImInfo } from "react-icons/im";

const Alert = ({ type, message }) => {
  if (type === "success") {
    return (
      <motion.div {...Fadeinout} className='fixed z-50 right-12 px-4 py-2 rounded-md backdrop-blur-sm bg-emerald-100 shadow-md flex items-center justify-center gap-4 '>
        <BsPatchCheckFill className='text-xl text-emerald-700'/>
        <p className='text-xl text-emerald-700'>{message}</p>
      </motion.div>
    )
  }
  if (type === "warning") {
    return (
      <motion.div {...Fadeinout} className='fixed z-50 right-12 px-4 py-2 rounded-md backdrop-blur-sm bg-yellow-100 shadow-md flex items-center justify-center gap-4 '>
        <IoWarningOutline className='text-xl text-yellow-700'/>
        <p className='text-xl text-yellow-700'>{message}</p>
      </motion.div>
    )
  }
  if (type === "danger") {
    return (
      <motion.div {...Fadeinout} className='fixed z-50 right-12 px-4 py-2 rounded-md backdrop-blur-sm bg-red-100 shadow-md flex items-center justify-center gap-4 '>
        <BiSolidAngry className='text-xl text-red-700'/>
        <p className='text-xl text-red-700'>{message}</p>
      </motion.div>
    )
  }
  if (type === "info") {
    return (
      <motion.div {...Fadeinout} className='fixed z-50 right-12 px-4 py-2 rounded-md backdrop-blur-sm bg-blue-100 shadow-md flex items-center justify-center gap-4 '>
        <ImInfo className='text-xl text-blue-700'/>
        <p className='text-xl text-blue-600'>{message}</p>
      </motion.div>
    )
  }
}

export default Alert
