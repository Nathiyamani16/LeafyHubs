import React, { useState } from "react";
import { statuses } from "../utils/styles";

const DashboardNewItems = () => {
  const [itemName, setItemName] = useState("");
  return (
    <div className="flex items-center flex-col pt-6 px-24 w-full ">
      <div
        className="border border-gray-300 rounded-md p-4 w-full 
      flex flex-col items-center justify-center gap-4"
      >
        <InputValueField
          type="text"
          placeHolder={"Item name here"}
          stateValue={setItemName}
          StateFunc={itemName}
        />
      </div>
        <div className="w-full flex items-center justify-around gap-3 flex-wrap">
          {statuses &&
            statuses?.map((data) => (
              <p
                key={data.id}
                className={`px-4 py-3 rounded-md text-xl text-block
            font-semibold cursor-pointer hover:shadow-md border
            border-gray-200 backdrop-blur-md`}
              >
                {data.title}
              </p>
            ))}
        </div>

    </div>
  );
};

export const InputValueField = ({ type, placeHolder, stateValue, stateFunc }) => {
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
