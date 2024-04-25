const alluserReducer=(state = null,action)=>{
    switch(action.type){
        case "GET_ALL_USER_DETAILS":
        return state;

        case "SET_ALL_USER_DETAILS":
        return action.allUsers;

        default:
            return state;
    }
}

export default alluserReducer;