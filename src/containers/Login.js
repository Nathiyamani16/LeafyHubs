import React, { useEffect, useState } from "react";
import bg from "../assets/img/bg.jpeg";
import Logo from "../assets/img/logo.png";
import {useNavigate} from "react-router-dom"
import { MdLock, MdMarkEmailRead } from "react-icons/md";
import Logininput from "../components/Logininput";
import { motion } from "framer-motion";
import {useDispatch,useSelector} from "react-redux"
import { buttonClick } from "../Animation/index";
import { FcGoogle } from "react-icons/fc";
import { app } from "../Config/firebaseConfig";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  validatePassword,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { validationJWTToken } from "../api";
import { setUserDetail } from "../context/reducer/userReducer";
import { alertInfo, alertWarning } from "../context/action/alertAction";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [password, setPassword] = useState("");
  const [confimpassword, setconfimpassword] = useState("");

  const navigate =useNavigate();
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const dispatch=useDispatch()
  const user =useSelector((state) => state.user)
  const alert =useSelector((state) => state.alert)
  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user]);
 

  const loginwithgoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((usercredential) => {
      firebaseAuth.onAuthStateChanged((Credential) => {
        if (Credential) {
          Credential.getIdToken().then((token) => {
            validationJWTToken(token).then((data) => {
        
              dispatch(setUserDetail(data));
            });
             navigate("/",{replace:true})
          });
        }
      });
    });
  };
  const SignUpwithPassword = async () => {
    if (userEmail === "" || password === "" || confimpassword === "") {
      dispatch(alertInfo('Require fields should not be empty'))
    } else {
      if (password === confimpassword) {
        setUserEmail("");
        setPassword("");
        setconfimpassword("");
        await createUserWithEmailAndPassword(firebaseAuth, userEmail, password).then(
          (usercredential) => {
            firebaseAuth.onAuthStateChanged((Credential) => {
              if (Credential) {
                Credential.getIdToken().then((token) => {
                  validationJWTToken(token).then((data) => {
                 
           
                    dispatch(setUserDetail(data));
                  });
                  navigate("/",{replace:true})
                });
              }
            });
          }
        );
      }else{
        dispatch(alertWarning("Password doesn't match"));

      }
    }
  };

  const signInemailPass = async () =>{
   if(userEmail !=="" && password !==""){
        await signInWithEmailAndPassword (firebaseAuth,userEmail,password).then(usercredential=>{
          firebaseAuth.onAuthStateChanged((Credential) => {
            if (Credential) {
              Credential.getIdToken().then((token) => {
                validationJWTToken(token).then((data) => {
               
               
                  dispatch(setUserDetail(data));
                });
              navigate("/",{replace:true})
              });
            }
          });
        })
   } else{
    dispatch(alertWarning("Password doesn't match"));

   }
  }

// actions

// reeducer
// store global
 

  return (
    <div className="w-screen h-screen relative overflow-hidden flex">
      <img src={bg} className="w-full h-full object-cover absolute" alt="" />
      {/* login content */}
      <div className="absolute inset-y-0 right-0 flex flex-col items-center bg-cardOverlay w-[80%] md:w-508 h-full z-10 backdrop-blur-md p-4 px-4 py-10 gap-3">
        {/* logo */}
        <div className="flex items-center justify-center gap-4 w-full">
          <img src={Logo} className="w-12" alt="Logo" />
          <p className="text-green-700 font-semibold text-2xl">LeafyHub</p>
        </div>
        <p className="text-lg font-bold text-block justify-center">
          Welcome Back
        </p>
        <p className="text-xl text-textColor -mt-4">
          {isSignUp ? "Sign UP" : "Sign In"} with Following
        </p>
        <div className="w-full flex flex-col items-center justify-center gap-4 px-4 md:px-12 py-4">
          <Logininput
            placeholder="Enter the Email here"
            icon={<MdLock className="text-xl text-headingColor" />}
            inputState={userEmail}
            inputStateFun={setUserEmail}
            type="Email"
            isSignUp={isSignUp}
          />
          <Logininput
            placeholder="Enter the Password here"
            icon={<MdMarkEmailRead className="text-xl text-headingColor" />}
            inputState={password}
            inputStateFun={setPassword}
            type="Password"
            isSignUp={isSignUp}
          />
          {isSignUp && (
            <Logininput
              placeholder="Enter the conform Password"
              icon={<MdMarkEmailRead className="text-xl text-headingColor" />}
              inputState={confimpassword}
              inputStateFun={setconfimpassword}
              type="Confirm Password"
              isSignUp={isSignUp}
            />
          )}

          {!isSignUp ? (
            <p>
              doesn't have an account :
              <motion.button
                {...buttonClick}
                className="text-red-500 underline cursor-pointer bg-transparent"
                onClick={() => setIsSignUp(true)}
              >
                Create one
              </motion.button>
            </p>
          ) : (
            <p>
            
              Already have an account :
              <motion.button
                {...buttonClick}
                className="text-red-500 underline cursor-pointer bg-transparent"
                onClick={() => setIsSignUp(false)}
              >
                Sign Up
              </motion.button>
            </p>
          )}

          {/* {button} */}
          {isSignUp ? (
            <motion.button
              {...buttonClick}
              className="w-full px-4 py-2 capitalize rounded-md bg-red-500 cursor-pointer text-white text-xl hover:bg-red-700 transition-all duration-150 "
              onClick={SignUpwithPassword}
            >
              Sign Up
            </motion.button>
          ) : (
            <motion.button
              {...buttonClick}
              className="w-full px-4 py-2 capitalize rounded-md bg-red-500 cursor-pointer text-white text-xl hover:bg-red-700 transition-all duration-150 "
           onClick={signInemailPass} >
              Sign In
            </motion.button>
          )}
        </div>
        <div className="flex items-center justify-between gap-16 ">
          <div className="w-24 h-[1px] rounded-md bg-green-700"></div>
          <p className="text-white">or</p>
          <div className="w-24 h-[1px] rounded-md bg-green-700"> </div>
        </div>
        <motion.div
          {...buttonClick}
          className="flex items-center px-4 py-2
         bg-white gap-3 rounded-3xl cursor-pointer backdrop-blur-md "
          onClick={loginwithgoogle}
        >
          <FcGoogle className="text-3xl capitalize" />
          <p className="text-base text-textColor capitalize">
            Sign In With Google
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
