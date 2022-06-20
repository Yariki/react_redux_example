import {combineReducers} from "redux";
import courseReducer from "./courseReducer";
import authorReducer from "./authorReducer";
import {apiStatusReducer} from "./apiStatusReducer";


const rootReducer = combineReducers({
    courses: courseReducer,
    authors: authorReducer,
	apiStatusReducer

});

export default rootReducer;
