import React, { Component } from 'react';
import { connect } from 'react-redux'

import * as actions from './store/actions'
import StudentForm from './StudentForm';
import Student from './Student';

class Content extends Component {
  constructor () {
    super()
    this.state = {}
  }

  componentDidMount() {
    // this.spinner = document.getElementById('spinner')
    // componentHandler.upgradeElement(this.spinner);
    this.props.onLoadStudents()
  }


  render() {

    let {students,lesson} = this.props
    // let currentLesson = this.props.currentLesson
    let attendance_ids = []
    if(this.state.lesson) {
      attendance_ids = this.state.lesson.attendances.map((attendance) => {return attendance.student_id})
    }
    // Default to a spinner
    let content = <div> 
      <div id="spinner" className="mdl-spinner mdl-js-spinner">Spin</div>
    </div>
    
    if(students) { // Something was returned
      if(this.props.lesson) { // we have selected a lesson
        if(students.length) { // There are some students
          content = <div className="student-list">
            <ul className="mdl-list"> {Object.keys(students).map((key) => {
              let student = students[key]
              if(student.attending == null) { student.attending = attendance_ids.includes(student.id) }

              return <Student key={"student-" + student.id} 
                student={ student } 
                active={student.attending} 
                onClick={() => this.props.onToggleAttendance(lesson,student)}
              />
            })}
            </ul>
          </div>
        } else { // It was empty
          content = <div className="student-form">
              <StudentForm></StudentForm>
          </div>
        }
      } else {
        content = <div>Please select a lesson from the menu</div>
      }
    }

    return <div id="content"><main className="mdl-layout__content">
        {content}
      </main>
      </div>
  }
}

const mapStateToProps = state => {
  return {
    lesson: state.lesson,
    students: state.students
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSelectStudent: (student_id) => dispatch({type: actions.SET_STUDENT, student_id: student_id}),
    onLoadStudents: () => dispatch(actions.loadStudents()),
    onToggleAttendance: (lesson,student) => dispatch(actions.toggleStudentAttendance(lesson,student))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Content)