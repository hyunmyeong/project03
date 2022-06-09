import {createStore, combineReducers} from "redux"
import image from "./modules/image";

const rootReaducer = combineReducers({image});

const store = createStore(rootReaducer);

export default store;
