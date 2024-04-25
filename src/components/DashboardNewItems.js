import React, { useState } from "react";
import { statuses } from "../utils/styles";
import { Spinner } from "../components";
import { MdDelete, MdOutlineCloudUpload } from "react-icons/md";
import {
  connectStorageEmulator,
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../Config/firebaseConfig";
import { useSelector, useDispatch } from "react-redux";
import {
  alertDanger,
  alertNULL,
  alertSuccess,
} from "../context/action/alertAction";
import { buttonClick } from "../Animation";
import { motion } from "framer-motion";

import { addNewProducts } from "../api";
import { setallProducts, getallProducts } from "../context/action/productActions";

const DashboardNewItems = () => {
  const [itemName, setItemName] = useState("");
  const [category, setcategory] = useState(null);
  const [price, setprice] = useState("");
  const [loading, setloading] = useState(false);
  const [progress, setprogress] = useState(null);
  const [imagedownloadUrl, setimagedownloadUrl] = useState(null);
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  const uploadImage = (e) => {
    setloading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}_${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setprogress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        dispatch(alertDanger(`Error : ${error}`));
        setTimeout(() => {
          dispatch(alertNULL());
        }, 3000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setimagedownloadUrl(downloadURL);
          setloading(false);
          setprogress(null);
          dispatch(alertSuccess("Image Uploaded to the cloud"));
          setTimeout(() => {
            dispatch(alertNULL());
          }, 3000);
        });
      }
    );
  };
  const deleteImageFromFirebase = () => {
    setloading(true);
    const deleteRef = ref(storage, imagedownloadUrl);

    deleteObject(deleteRef).then(() => {
      setimagedownloadUrl(null);
      setloading(false);
      dispatch(alertSuccess("Delete image successfully from the cloud."));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
    });
  };
  const submitNewData=()=>{
    const data={
      product_name:itemName,
      product_category:category,
      product_price:price,
      imageURL:imagedownloadUrl,


    };
   
    addNewProducts(data).then((res)=>{
    console.log(res)
    dispatch(alertSuccess("New Products Added"))
    setTimeout(()=>{
      dispatch(alertNULL())
    },3000);
    setimagedownloadUrl(null)
    setItemName("")
    setprice("")
    setcategory(null)
   })
   .then(()=>{
   dispatch(getallProducts());
   })
   .catch((err)=>{
console.error("error adding new product",err)

   })

  }; 
  return (
    <div className="flex items-center flex-col pt-6 px-24 w-full ">
      <div
        className="border border-gray-300 rounded-md p-4 w-full 
      flex flex-col items-center justify-center gap-4"
      >
        <InputValueField
          type="text"
          placeHolder={"Item name here"}
          stateValue={itemName}
          stateFunc={setItemName}
        />

        <div className="w-full flex items-center justify-around gap-3 flex-wrap">
          {statuses &&
            statuses?.map((data) => (
              <p
                key={data.id}
                onClick={() => setcategory(data.category)}
                className={`px-4 py-3 rounded-md text-sm text-block
            font-semibold cursor-pointer hover:shadow-md border
            border-gray-200 backdrop-blur-md ${
              data.category === category
                ? "bg-green-400 text-primary"
                : "bg-transparent"
            }`}
              >
                {data.title}
              </p>
            ))}
        </div>
        <InputValueField
          type="number"
          placeHolder={"Item price here"}
          stateValue={price}
          stateFunc={setprice}
        />
        <div className="w-full bg-card backdrop-blur-md h-370 rounded-md border-dotted border-gray-200 cursor-pointer">
          {loading ? (
            <div
              className="w-full h-full flex flex-col items-center
justify-evenly px-24"
            >
              <Spinner />
              {Math.round(progress > 0) && (
                <div
                  className="w-full flex flex-col items-center
                justify-center gap-2"
                >
                  <div className="flex justify-between w-full">
                    <span className="text-base font-medium text-textColor">
                      progress
                    </span>
                    <span className="text-sm font-medium text-textColor">
                      {Math.round(progress) > 0 && (
                        <>{`${Math.round(progress)}%`}</>
                      )}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-green-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                      style={{ width: `${Math.round(progress)}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              {!imagedownloadUrl ? (
                <>
                  <label>
                    <div className="flex flex-col items-center justify-center h-full w-full cursor-pointer">
                      <div className="flex flex-col justify-center items-center cursor-pointer">
                        <p className="font-bold text-3xl">
                          <MdOutlineCloudUpload className="-rotate-0" />
                        </p>
                        <p className="text-lg text-textColor">
                          Click to upload an image
                        </p>
                      </div>
                    </div>
                    <input
                      type="file"
                      name="upload-image"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative w-full h-full overflow-hidden rounded-md">
                    <motion.img
                      whileTap={{ scale: 1.15 }}
                      src={imagedownloadUrl}
                      className="w-full h-full object-scale-down"
                    />
                    <motion.button
                      {...buttonClick}
                      className="absolute top-3 right-3 p-3 rounded-full bg-green-500 
                  text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                      onClick={() => deleteImageFromFirebase(imagedownloadUrl)}
                    >
                      <MdDelete className="-rotate-0" />
                    </motion.button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <motion.button onClick={submitNewData} {...buttonClick}
        className="w-9/12 py-2 rounded-md bg-green-400 text-primary
        hover:bg-green-600 cursor-pointer">Submit

        </motion.button>
      </div>
    </div>
  );
};

export const InputValueField = ({
  type,
  placeHolder,
  stateValue,
  stateFunc,
}) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeHolder}
        className="w-full px-4 py-3 bg-slate-50 shadow-md outline-none
      rounded-md border border-gray-200 focus:border-red-400"
        value={stateValue}
        onChange={(e) => stateFunc(e.target.value)}
      ></input>
    </>
  );
};

export default DashboardNewItems;
