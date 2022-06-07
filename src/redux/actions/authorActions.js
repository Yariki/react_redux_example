import * as types from "./actionTypes";
import * as authorApi from "../../api/authorApi";



export function loadAuthorsSuccess(authors){
	// eslint-disable-next-line import/namespace
	return {type: types.LOAD_AUTHORS_SUCCESS, authors};
}

export function loadAuthors(){
	return function(dispatch){
		return 	authorApi.getAuthors()
			.then(authors => {
				dispatch(loadAuthorsSuccess(authors));
			})
			.catch(error => {
				throw(error);
			});
	}
}
