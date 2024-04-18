import React from 'react'
import { Logo } from "../containers";
import { Link, NavLink ,useNavigate,} from "react-router-dom";
import { isActiveStyles, isnotActiveStyles } from '../utils/styles';


const DataLeftSec = () => {
  return (
    <div className='h-full py-12 flex flex-col bg-cardOverlay backdrop-blur-md shadow-lg min-w-210 w-300 gap-3'>
     <NavLink to={"/"} className="flex items-center justify-start px-6 gap-4 ">
        <img src={Logo} className="w-12" alt="" />
        <p className="font-semibold text-xl">LeafyHub</p>
      </NavLink>
      <hr/>
      <ul className='flex flex-col gap-4'>
      <NavLink
            className={({ isActive }) =>
              isActive ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500` : isnotActiveStyles
            }
            to={"/dashboard/home"}
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500` : isnotActiveStyles
            }
            to={"/dashboard/orders"}
          >
            Orders
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-700` : isnotActiveStyles
            }
            to={"/dashboard/items"}
          >
            Items
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-700` : isnotActiveStyles
            }
            to={"/dashboard/newItems"}
          >
             Add New Item
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-700` : isnotActiveStyles
            }
            to={"/dashboard/users"}
          >
             User
          </NavLink>


      </ul>
        <div className='w-full items-center justify-center flex h-225 mt-auto px-2 '>
    <div className='w-full h-full rounded-md bg-red-400 flex items-center
    justify-center flex-col gap-3 px-3'>
        <div className='w-12 h-12 borde bg-white rounded-full flex
        items-center justify-center'>
            <p className='text-2xl font-semibold'>?</p>
        </div>
        <p className='text-xl text-primary font-semibold'>Help Center</p>
        <p className='text-base text-gray-300 text-center'>Having trouble in the city, please contact us for more information.</p>
        <p className='px-5 py-3 rounded-full bg-primary text-red-600 cursor-pointer'>Get in touch</p>
    </div>
</div>


    </div>
  )
}

export default DataLeftSec
