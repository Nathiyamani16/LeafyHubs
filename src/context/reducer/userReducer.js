export const setUserDetail = (user)=>{
    return {
        type:"SET_USER",
        user:user
    }
}

export const getUserDetail = ()=>{
    return {
        type:"GET_USER",
 
    }

}
export const setUserNULL = ()=>{
    return {
        type:"SET_USER_NULL",
        user:null
 
    }
    
}