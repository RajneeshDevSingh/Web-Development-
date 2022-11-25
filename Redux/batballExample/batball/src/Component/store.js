// import { createStore } from "redux";
import { legacy_createStore as createStore} from 'redux'
import BatReducer from "./batreducer";




const store = createStore(BatReducer);
export default store