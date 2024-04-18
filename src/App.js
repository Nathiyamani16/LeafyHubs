import React ,{useEffect,useState}from 'react';
import { Route, Routes,useNavigate } from 'react-router-dom';
import { Dashboard, Login, Mainpage } from './containers';
import { getAuth } from 'firebase/auth';
import { validationJWTToken } from "./api";
import {useDispatch,useSelector} from "react-redux"
import {motion} from "framer-motion"


import { app } from './Config/firebaseConfig';
import { setUserDetail } from './context/reducer/userReducer';
import { Fadeinout } from './Animation';
import MainLoader from './components/MainLoader';
import { Alert } from './components';

const App = () => {

  const firebaseAuth = getAuth(app);
   const [isloading, setisloading] = useState(false)
 const dispatch=useDispatch()
 const alert=useSelector((state)=>state.alert)

   useEffect(() => {
     setisloading(true);
     firebaseAuth.onAuthStateChanged((Credential) => {
      if (Credential) {
        Credential.getIdToken().then((token) => {
          validationJWTToken (token).then((data) => {
          dispatch(setUserDetail(data));
          });
        });
      }
      setInterval(() => {
        setisloading(false);
      },2000);
    });
   
    
   }, [])
   

  return (
    <div className='w-screen min-h-screen h-auto flex flex-col items-center justify-center'>
      {isloading && (
        <motion.div {...Fadeinout} className='fixed z-50 inset-0 bg-cardOverlay backdrop-blur-2xl flex 
        items-center justify-center w-full'>
          
        <MainLoader/></motion.div>
      )}
      <Routes>
        <Route path="/*" element={<Mainpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />} />

     
      </Routes>
      {alert?.type && <Alert type={alert?.type} message={alert?.message}/>}
    </div>
  );
};

export default App;
