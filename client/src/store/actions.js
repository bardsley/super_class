const ajaxFetch = (endpoint) => {
    return window.fetch(endpoint)
    .then(response => response.json())
    .catch(error => console.log(error))
}

const ajaxPost = (endpoint,body) => {
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

function detectmob() { 
    if( navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
    ){
       return true;
     }
    else {
       return false;
     }
   }

const ajaxDelete = (endpoint,body) => {
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

export const SET_LESSON = 'SET_LESSON'
export const LOAD_STUDENTS = 'LOAD_STUDENTS'
export const SET_STUDENT = 'SET_STUDENT'
export const TOGGLE_STUDENT = 'TOGGLE_STUDENT' 
export const CREATE_STUDENT = 'CREATE_STUDENT'

// Action Creators for Student Editing
export const createStudent = (student) => {
    return dispatch => {
        ajaxPost('/api/students', {
            full_name: student.full_name,
            email: student.email,
            phone_number: student.phone,
        }).then(student => {
            dispatch(submitStudent(student))
        })
        .then(student => {
            dispatch(loadStudents())
        })
        
    }
}

export const submitStudent = (student) => {
    return {
        type: CREATE_STUDENT,
        student: student
    }
}

// Actions around selecting a current lesson
export const getLesson = (lesson_id) => {
    return dispatch => {
        // Do a fetch
        ajaxFetch('/api/lessons/' + lesson_id)
        .then(lesson => {
          if (lesson) {
            dispatch(setLesson(lesson))
          } else {
              console.error('No lesson found',lesson_id)
          }
        })
    }
}

export const setLesson = (lesson) => {
    return {
        type: SET_LESSON,
        lesson: lesson,
    }
}

// Action lreating to currently displayed Students
export const loadStudents = () => {
    return filterStudents(null)
}

export const filterStudents = (query) => {
    let query_string = query ? "?q=" + query + "&order=alphabetical" : ""
    return dispatch => {
        ajaxFetch('/api/students' + query_string)
        .then(students => {
            if (students && students.length) {
                dispatch(setStudents(students,query))
            } else {
                dispatch(setStudents([],query))
            }
        })
    }
}

export const setStudents = (students,query) => {
    return {
        type: LOAD_STUDENTS,
        students: students,
        query: query
    }
}

// Attendance STuff
export const toggleStudentAttendance = (lesson,student) => {
    student.attending = !student.attending
    return dispatch => {
        if(student.attending) {
            ajaxPost('/api/attendances', {
              student_id: student.id,
              lesson_id: lesson.id
            }).then(response => {
                dispatch(setStudentAttendance(student))
                return response
            }).then(response => {
                if(detectmob()){
                    window.open("sumupmerchant://pay/1.0" +
                        "?callbacksuccess="+ encodeURIComponent("https://super-class.herokuapp.com/api/conclude_payment") +
                        "&callbackfail="+ encodeURIComponent("https://super-class.herokuapp.com/api/fail_payment") +
                        "&title="+ encodeURIComponent(lesson.name) +
                        "&foreign-tx-id=" + response.id +
                        "&currency=GBP" + "&amount=0.0" +
                        "&affiliate-key=416a4490-6742-44c5-b2f5-261c88375687")
                } 
            })
          } else {
            ajaxDelete('/api/attendances/clear',{
              student_id: student.id,
              lesson_id: lesson.id  
            }).then(response => {dispatch(setStudentAttendance(student))})
          }
        return 
    }
  }

export const setStudentAttendance = (student) => {
    return {
        type: TOGGLE_STUDENT,
        student: student,
    }
}
