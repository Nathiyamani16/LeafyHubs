export const setallUserDetails =(data)=>{
    return{
        type:"SET_ALL_USER_DETAILS",
        allUsers:data,
    };
};

export const getallUserDetails=(data)=>{
    return{
        type:"GET_ALL_USER_DETAILS",
    }
}