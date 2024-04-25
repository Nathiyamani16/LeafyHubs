import React from 'react'
import { BsFillBellFill, BsToggles2 } from 'react-icons/bs';
import { MdLogout, MdSearch } from 'react-icons/md';
import {useSelector,useDispatch} from "react-redux"
import {motion} from "framer-motion"
import { buttonClick } from '../Animation';
import { Avatar } from "../containers";
import {useNavigate} from "react-router-dom"
import { setUserNULL } from '../context/reducer/userReducer';
import { app } from '../Config/firebaseConfig';
import { getAuth } from 'firebase/auth';


const DBHeader = () => {
    const firebaseAuth =getAuth(app)
const navigate =useNavigate();
const dispatch=useDispatch();

const signOut =()=>{
firebaseAuth.signOut().then(()=>{
  dispatch(setUserNULL());
navigate("/login",{replace:true});

})
.catch((err) =>console.log(err));
}

    const user=useSelector((state) => state.user);
  return (

   
    <div className='w-full flex items-center justify-between gap-3'>
        <p className='text-2xl text-headingColor'>Welcome to LeafyHub
        {user ?.name && (
            <span className='block text-base text-gray-500'>{`Hello ${user?.name}...!`}</span>
        )}
      </p>
      <div className='flex items-center justify-center gap-4'>
            <div className='flex items-center justify-center gap-3 px-4 py-2 bg-slate-100 backdrop-blur-md rounded-md shadow-xl '>
                <MdSearch className='text-gray-400 text-2xl' />
                <input className='border-none outline-none bg-transparent w-32 text-base font-semibold text-cardOverlay' type="text" placeholder='Search Here.'
                />
                <BsToggles2 className='text-gray-400 text-2xl'/>
            </div>
            <motion.div {...buttonClick} className='w-10 h-10 rounded-md cursor-pointer bg-lighttextGray backdrop-blur-md
            shadow-md flex items-center justify-center'>
                <BsFillBellFill className='text-gray-50 text-xl'/>

            </motion.div>
            <div className="flex items-center justify-center gap-2">
            <div className="w-10 h-10 rounded-full shadow-md cursor-pointer overflow-hidden flex items-center">
              <motion.img
                className="w-full h-full object-cover"
                src={user?.picture ? user.picture : Avatar}
                whileHover={{ scale: 1.15 }}
                referrerPolicy="no-referrer"
              />
            </div>
            <motion.div {...buttonClick} onClick={signOut} className='w-10 h-10 rounded-md cursor-pointer bg-lighttextGray backdrop-blur-md flex items-center justify-center'>
              <MdLogout className='text-gray-50 text-xl'/>
            </motion.div>
            </div>
            </div>
    </div>
  )
}

export default DBHeader
