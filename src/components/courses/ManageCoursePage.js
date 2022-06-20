import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import {newCourse} from "../../../tools/mockData";
import Spinner	from "../common/Spinner";
import {toast} from "react-toastify";


function  ManageCoursePage({ courses, authors, loadCourses, loadAuthors, saveCourse ,history, ...props}){

    const [course, setCourse] = useState({...props.course});
    const [errors, setErrors] = useState({});
	const [saving, setSaving] = useState(false);


	useEffect(() => {

        if(courses.length === 0){
            loadCourses().catch(error => {
                alert("Loading courses failed: " + error )
            });
        }else{
			setCourse({...props.course})
		}
        if(authors.length === 0){
            loadAuthors().catch(error => alert("Loading authors failed:" + error));
        }
	},[props.course]);

    function handleChange(event){
        const {name, value} = event.target;

        setCourse(prevCourse => ({
            ...prevCourse,
            [name]: name === "authorId" ? parseInt(value,10) : value
        }));
    }

	function handleSave(event){
		event.preventDefault();
		setSaving(true)
		saveCourse(course).then(() => {
			toast("Course is saved");
			history.push("/courses");
		}).catch(error => {
			setSaving(false);
			setErrors({onSave: error.message});
		});
	}

    return (
		authors.length === 0 || courses.length === 0 ? (<Spinner />) :
			(<CourseForm  course={course} errors={errors} authors={authors} onChange={handleChange} onSave={handleSave} saving={saving}/>)
    );

}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    loadAuthors: PropTypes.func.isRequired,
    loadCourses: PropTypes.func.isRequired,
	saveCourse: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps){

	const slug = ownProps.match.params.slug;
	const course = slug ? state.courses.find(course => course.slug === slug) : newCourse;

	return {
        course,
        courses: state.courses,
        authors: state.authors
    };
}

const  maspDispatchToProps = {
    loadCourses: courseActions.loadCourses,
    loadAuthors: authorActions.loadAuthors,
	saveCourse : courseActions.saveCourse
};

export default connect(mapStateToProps, maspDispatchToProps)(ManageCoursePage);
