import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";

class CoursesPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            course: {
                title: ""
            }
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const course = { ...this.state.course, title: event.target.value };
        this.setState({ course });
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.createCourse(this.state.course);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h2>Courses</h2>
                <h3>Add course</h3>
                <input type="text" value={this.state.course.title} onChange={this.handleChange} />
                <input type="submit" value="Save" />

                { this.props.courses.map(course => (
                    <div key={course.title}>{course.title}</div>
                )) }
            </form>
        );
    }
}

CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    createCourse: PropTypes.func.isRequired
};

function mapStateToProps(state) {

    return {
        courses: state.courses
    };
}

function maspDispatchToProps(dispatch) {
    return {
        createCourse: course => dispatch(courseActions.createCourse(course))
    };
}

export default connect(mapStateToProps, maspDispatchToProps)(CoursesPage);