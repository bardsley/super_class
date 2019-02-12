import React, { Component } from 'react';
import { connect } from 'react-redux'

import * as actions from './store/actions'
import StudentForm from './StudentForm';
import Student from './Student';

class Content extends Component {
  constructor () {
    super()
    this.state = {}
    this.getStudents = this.getStudents.bind(this)
    // this.setStudent = this.setStudent.bind(this)
  }

  componentDidMount() {
    // this.spinner = document.getElementById('spinner')
    // componentHandler.upgradeElement(this.spinner);
    this.getStudents()
    window.app = this
  }

  fetch (endpoint) {
    return window.fetch(endpoint)
      .then(response => response.json())
      .catch(error => console.log(error))
  }

  post (endpoint,body) {
    return window.fetch(endpoint,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .catch(error => console.log(error))
  }

  delete(endpoint,body) {
    return window.fetch(endpoint,{
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
    .catch(error => console.log(error))
  }

  filterStudents(query) {
    let query_string = query ? "?q=" + query : ""
    this.fetch('/api/students' + query_string)
        .then(students => {
          if (students && students.length) {
            this.setState({students: students})
            //this.getStudent(students[0].id)
          } else {
            this.setState({students: []})
          }
        })
  }

  getStudents () {
    this.filterStudents(null)
  }

  fetchAndStoreStudent(id) {
    this.fetch(`/api/students/${id}`)
      .then(student => {
        this.setState({student: student})
        this.post('/api/attendances', {
          student_id: student.id,
          lesson_id: this.props.currentLesson
        })
      })
  }
  toggleAttendance (student) {
    student.attending = !student.attending
    this.setState({student: student})
    if(student.attending) {
      this.post('/api/attendances', {
        student_id: student.id,
        lesson_id: this.props.currentLesson
      })
    } else {
      this.delete('/api/attendances/clear',{
        student_id: student.id,
        lesson_id: this.props.currentLesson  
      })
    }
    
  }

  createStudent() {
    this.post('/api/students', {
      email: "newbie@whatevs.com",
      first_name: "New",
      last_name: "Bee",
      phone_number: "012345567218",
    })
    .then(
        student => {
          this.setState({student: student})
          let origStudents = this.state.students
          console.log(origStudents)
          origStudents.push(student)
          // let newStudents =
          console.log(origStudents)
          this.setState({students: origStudents })
        }
    )
  }

  render() {

    let {students} = this.state
    let currentLesson = this.props.currentLesson
    // Default to a spinner
    let content = <div> 
      <div id="spinner" className="mdl-spinner mdl-js-spinner"></div>
    </div>
    
    if(students) { // Something was returned
      if(currentLesson) { // we have selected a lesson
        if(students.length) { // There are some students
          content = <div className="student-list">
            <ul className="mdl-list"> {Object.keys(students).map((key) => {
              return <Student key={"student-" + students[key].id} 
                student={ students[key] } 
                active={students[key].attending} 
                onClick={() => this.toggleAttendance(students[key])}
              />
              // return <Student key={"student-" + students[key].id} student={ students[key] } active={student && (students[key].id === student.id)} 
              //   onClick={() => this.props.onSelectStudent(students[key].id)}
              // />
            })}
            </ul>
          </div>
        } else { // It was empty
          content = <div className="student-form">
              <StudentForm></StudentForm>
          </div>
        }
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
    currentLesson: state.currentLesson
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSelectStudent: (student_id) => dispatch({type: actions.SET_STUDENT, student_id: student_id})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Content)