import React ,{useState}from "react";
import { Link, NavLink ,useNavigate,} from "react-router-dom";
import { Logo } from "../containers";
import { isActiveStyles, isnotActiveStyles } from "../utils/styles";
import { motion } from "framer-motion";
import { buttonClick, slideTop } from "../Animation";
import { MdShoppingCart, MdAdd, MdLogout, MdOpacity } from "react-icons/md";
import { useSelector ,useDispatch} from "react-redux";
import { app } from "../Config/firebaseConfig";
import { Avatar } from "../containers";
import { getAuth } from "firebase/auth";
import { setUserNULL } from "../context/reducer/userReducer";
const Header = () => {
  const user = useSelector((state) => state.user);
const [isMenu, setisMenu] = useState(false)
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

  return (
    <header
      className="fixed backdrop-blur-md z-50 inset-x-0 top-0 flex items-center
   justify-between px-12 md:px-20 py-6 "
    >
      <NavLink to={"/"} className="flex items-center justify-center gap-4">
        <img src={Logo} className="w-12" alt="" />
        <p className="font-semibold text-xl">LeafyHub</p>
      </NavLink>
      <nav className="flex items-center justify-center gap-8">
        <ul className="hidden md:flex items-center justify-center gap-16">
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isnotActiveStyles
            }
            to={"/"}
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isnotActiveStyles
            }
            to={"/menu"}
          >
            Menu
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isnotActiveStyles
            }
            to={"/services"}
          >
            Services
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isnotActiveStyles
            }
            to={"/aboutus"}
          >
            About Us
          </NavLink>
        </ul>
        <motion.div {...buttonClick} className="relative cursor-pointer">
          <MdShoppingCart className="text-3xl text-textColor " />
          <div
            className="w-6 h-6  rounded-full bg-green-500 flex items-center justify-center
          -top-4 absolute -right-1"
          >
            <p className="text-primary text-base font-semibold">2</p>
          </div>
        </motion.div>
        {user ? (
          <div className="relative cursor-pointer " onMouseEnter={() => setisMenu(true)}>
            <div className="w-12 h-12 rounded-full shadow-md cursor-pointer overflow-hidden flex items-center">
              <motion.img
                className="w-full h-full object-cover"
                src={user?.picture ? user.picture : Avatar}
                whileHover={{ scale: 1.15 }}
                referrerPolicy="no-referrer"
              />
            </div>
            {isMenu && (
             <motion.div {...slideTop}
               onMouseLeave={()=>setisMenu(false)}
              className="px-6 py-4 w-48 bg-cardOverlay backdrop-blur-md rounded-md  absolute
      top-12 right-0 flex flex-col gap-4"
            >
              <Link
                className="hover:text-red-500 text-xl text-textColor "
                to={"/dashboard/home"}
              >
                Dashboard
              </Link>
              <Link
                className="hover:text-red-500 text-xl text-textColor "
                to={"/profile"}
              >
                My Profile
              </Link>
              <Link
                className="hover:text-red-500 text-xl text-textColor "
                to={"/user-orders"}
              >
                Orders
              </Link>
              <hr />
              <motion.div onClick={signOut}
                {...buttonClick}
                className="group items-center justify-center py-2 rounded-md bg-gray-100 px-3 shadow-md hover:bg-gray-300 gap-3"
              >
                <MdLogout className="text-2xl text-textColor group-hover:text-headingColor" />
                <p className="text-textColor text-xl group-hover:text-headingColor">
                  Sign Out
                </p>
              </motion.div>
            </motion.div>)}
           
          </div>
        ) : (
          <>
            <NavLink to={"/login"}>
              <motion.button
                {...buttonClick}
                className="px-4 py-2 rounded-md shadow-md bg-cardOverlay border border-red-300 cursor-pointer"
              >
                Login
              </motion.button>
            </NavLink>{" "}
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
