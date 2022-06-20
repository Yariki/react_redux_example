import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";
import { beginApiCall, apiCallError} from "./actionApiStatus";


export function createCourse(course){
    return {
        type: types.CREATE_COURSE,
        course
    };
}

export function updateCourseSuccess(course){
	return {
		type: types.UPDATE_COURSE_SUCCESS,
		course
	};
}

export function createCourseSuccess(course){
	return {
		type: types.CREATE_COURSE_SUCCESS,
		course
	};
}

export function loadCoursesSuccess(courses){
	// eslint-disable-next-line import/namespace
	return {type: types.LOAD_COURSES_SUCCESS, courses};
}

export function loadCourses(){

	return function(dispatch){
		dispatch(beginApiCall());

		return 	courseApi.getCourses()
			.then(courses => {
				dispatch(loadCoursesSuccess(courses));
			})
			.catch(error => {
				dispatch(apiCallError(error));
				throw(error);
			});
	}
}

export function saveCourse(course){
	return function(dispath, getState){
		dispath(beginApiCall());

		return courseApi.saveCourse(course)
			.then(savedCourse => {
				savedCourse.id ?
					dispath(updateCourseSuccess(savedCourse))
				: 	dispath(createCourseSuccess(savedCourse));
			})
			.catch(error => {
				dispath(apiCallError(error));
				throw error
			});
	}
}
