import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getallProducts } from "../api";
import { setallProducts } from "../context/action/productActions";
import { CChart } from "@coreui/react-chartjs";
const DashboardHome = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const Indoor = products?.filter((item) => item.product_category === "Indoor");
  const Outdoor = products?.filter((item) => item.product_category === "Outdoor");
  const Succulent = products?.filter((item) => item.product_category === "Succulent");
  const Flowering = products?.filter((item) => item.product_category === "Flowering");
  const Purifying = products?.filter((item) => item.product_category === "Purifying");
  const Herbs = products?.filter((item) => item.product_category === "Herbs");
  const Bonsai = products?.filter((item) => item.product_category === "Bonsai");
  const Fern = products?.filter((item) => item.product_category === "Fern");
  const Aquatic = products?.filter((item) => item.product_category === "Aquatic");



  useEffect(() => {
    if (!products) {
      getallProducts().then((data) => {
        dispatch(setallProducts(data));
        console.log(data);
      });
    }
  }, []);

  return (
    <div className="flex items-center justify-center flex-col pt-6 w-full h-full">
      <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-4n h-full">
        <div className="flex items-center justify-center">
          <div className="w-340 md:w-508">
            <CChart
              type="bar"
              data={{
                labels: [
                  "Indoor",
                  "Outdoor",
                  "Succulent",
                  "Flowering",
                  "Purifying",
                  "Herbs",
                  "Bonsai",
                  "Fern",
                  "Aquatic",
                ],
                datasets: [
                  {
                    label: "Category wise Count",
                    backgroundColor: "#f87979",
                    data: [Indoor?.length,
                          Outdoor?.length,
                          Succulent?.length,
                          Flowering?.length,
                          Purifying?.length,
                          Herbs?.length,
                          Bonsai?.length,
                          Fern?.length,
                          Aquatic?.length],
                  },
                ],
              }}
              labels="months"
            />
          </div>
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-275 md:w-420">
            <CChart
              type="doughnut"
              data={{
                labels: ["Orders",
                      "Delivered",
                    "Cancelled",
                  "Paid",
                "Not Paid"],
                datasets: [
                  {
                    backgroundColor: [
                      "#51FF08",
                      "#41B883",
                      "#E46651",
                      "#00D8FF",
                      "#DD1B16",
                    ],
                    data: [40, 20,80, 34, 54],
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
