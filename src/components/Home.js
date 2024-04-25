import React from 'react'
import {motion} from "framer-motion"
import Delivery from "../assets/img/delivery.png"
import { buttonClick, unknowFadeInout } from '../Animation'
import bg from "../assets/img/plant17.png"
import { randomData } from '../utils/styles'

const Home = () => {
  return (
    
 <motion.div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4'>
    <div className='flex flex-col items-start justify-start gap-6'>
        <div className='px-4 py-1 flex items-center justify-center gap-2
        bg-red-100 rounded-full'>
            <p className='text-lg font-semibold text-red-600'>Free Delivery</p>
         <div className='w-10 h-10 flex items-center justify-center rounded-full bg-primary shadow-md'>
         <img src={Delivery} alt=""className='w-full h-full object-contain' />
         </div>
        </div>
        <p className='text-[25px] text-headingColor
         md:text-[62px] font-sans font-extrabold tracking-wider'>Enjoy the fastest delivery in<span className='text-red-600'>Your City with LeafyHub!</span> </p>
         <p className='text-textColor text-lg '>
         Shop with LeafyHub for the fastest delivery in your city! Explore our selection of plants and garden essentials, 
         all delivered to your doorstep. Transform your space effortlessly. Experience LeafyHub today!"

         </p>
         <motion.button {...buttonClick} type="button"
          className="bg-gradient-to-br from-green-400 to-green-500 w-full md:w-auto  px-4 py-2 
                  rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 ">Order Now</motion.button>
    </div>
    <div className='py-2 flex-1 flex items-center justify-end relative'>
      
        <div className='w-full md:w-460 ml-0 flex flex-wrap items-center justify-center gap-4 gap-y-14'>
            {randomData && randomData.map((data,i)=>(
                <motion.div whileTap={{ scale: 0.75 }} 
                key={i} {...unknowFadeInout(i)} className='w-32 h-36 md:h-auto md:w-190 p-4 bg-gray-100 backdrop-blur-md rounded-3xl flex flex-col items-center
                justify-center drop-shadow-lg'>
                    <img src={data.imageURL} className='w-12
                    h-12 md:w-32 md:h-32 md:-mt-16 object-contain' alr=""/>
                    <p className='text-sm lg:text-xl font-semibold text-textColor'>
                        {data.product_name.slice(0,14)}
                    </p>
                    <p className='text-[12px] text-center md:text-base text-lighttextGray font-semibold capitalize'>
                     {data.product_category}
                    </p>
                    <p className='text-sm font-semibold text-headingColor'>
                        <span className='text-xs text-green-600'>Rs.</span>
                        {data.product_price}
                    </p>


                </motion.div>
            ))}
        </div>
    </div>
 </motion.div>
  )
}

export default Home
