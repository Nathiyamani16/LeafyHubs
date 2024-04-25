import React from "react";
import { Header, Home, HomeSlider } from "../components";

const Mainpage = () =>{
    return <main className="w-screen min-h-screen flex items-center justify-start  bg-primary flex-col">
     <Header />
   <div className="w-full flex flex-col items-start justify-center mt-40 px-6 md:px-24
   2xl:px-96 gap-12 pb-24">
    <Home/>
    <HomeSlider/>

   </div>
        </main>
    
}
export default Mainpage;