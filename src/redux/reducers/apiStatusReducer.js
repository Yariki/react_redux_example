import * as types from '../actions/actionTypes';
import initialState from "./initialState";


export function apiCallInSuccess(action){
	const success = action.type.substring(action.type.length - 8);
	return success === "_SUCCESS";
}

export function apiStatusReducer(state = initialState.apiCallsInProgress, action) {
	if(action.type === types.BEGIN_API_CALL) {
		return state + 1;
	} else if(action.type === types.API_CALL_ERROR || apiCallInSuccess(action)) {
		return state - 1;
	}
	return state;
}
