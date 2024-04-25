import {combineReducers} from "redux";
import userReducer from "../action/useraction";
import alertReducer from "./alertReducer";
import productReducer from "./productReducer";
import alluserReducer from "./alluserReducer";



const ourReducers =combineReducers({
    user:userReducer,
    alert:alertReducer,
   products:productReducer,
   allUsers:alluserReducer,
});

export default ourReducers;