import {combineReducers} from "redux";
import userReducer from "../action/useraction";
import alertReducer from "./alertReducer";


const ourReducers =combineReducers({
    user:userReducer,
    alert:alertReducer,
})

export default ourReducers;