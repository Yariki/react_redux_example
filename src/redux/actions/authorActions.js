import * as types from "./actionTypes";
import * as authorApi from "../../api/authorApi";
import {beginApiCall, apiCallError} from "./actionApiStatus";



export function loadAuthorsSuccess(authors){
	// eslint-disable-next-line import/namespace
	return {type: types.LOAD_AUTHORS_SUCCESS, authors};
}

export function loadAuthors(){
	return function(dispatch){
		dispatch(beginApiCall());

		return 	authorApi.getAuthors()
			.then(authors => {
				dispatch(loadAuthorsSuccess(authors));
			})
			.catch(error => {
				apiCallError(error);
				throw(error);
			});
	}
}
