import axios from "axios";

export const baseURL = "http://127.0.0.1:5001/leafyhubs/us-central1/app";

export const validationJWTToken = async (token) => {
  try {
    const res = await axios.get(`${baseURL}/api/users/jwtverification`, {
      headers: { Authorization: "Bearer " + token },
    });
    return res.data.data;
  } catch (err) {
    return null;
  }
};

// add new products
export const addNewProducts = async (data) => {
  try {
    const res = await axios.post(`${baseURL}/api/products/create`, { ...data });
    return res.data.data;
  } catch (err) {
    return null;
  }
};

export const getallProducts = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/products/all`);
      return res.data.data;
    } catch (err) {
      return null;
    }
  };

  // delete a product
  export const deleteProduct = async (productId) => {
    try {
      const res = await axios.delete(`${baseURL}/api/products/delete/${productId}`);
      return res.data.data;
    } catch (err) {
      return null;
    }
  };

  // get all users
  export const getAllUsers = async()=>{
    try{
      const res=await axios.get(`${baseURL}/api/users/all`);
      return res.data.data;
    }catch(err){
      return null;
    }
  }

  
