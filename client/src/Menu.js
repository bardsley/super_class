import React, { Component } from 'react';
import { connect } from 'react-redux'

class Menu extends Component {
  constructor () {
    super()
    this.state = {}
    this.getLessons = this.getLessons.bind(this)
    // this.setLesson = this.setLesson.bind(this)
  }

  componentDidMount() {
    this.getLessons()
    window.app = this
  }
  
  fetch (endpoint) {
    return window.fetch(endpoint)
      .then(response => response.json())
      .catch(error => console.log(error))
  }

  getLessons() {
    this.fetch('/api/lessons')
        .then(lessons => {
          if (lessons && lessons.length) {
            this.setState({lessons: lessons})
            //this.getStudent(students[0].id)
          } else {
            this.setState({lessons: []})
          }
        })
  }
  setLesson(lesson) {
    window.app.setState({currentLesson: lesson})
    this.setState({lesson: lesson})
  }
  
  
  render() {
    let lessons = this.state.lessons

    // Default 
    let content = <div className="mdl-layout__drawer">
      <span className="mdl-layout-title">Menu</span>
      <a className="mdl-navigation__link" href={"/"}>No Lessons</a>
    </div>
    
    if(lessons) {
      content = <div className="mdl-layout__drawer">
        <span className="mdl-layout-title">Menu</span>
        <nav className="mdl-navigation"> {Object.keys(lessons).map((key) => {
          let lesson = lessons[key]
          let selected_class = lesson.id === this.props.currentLesson ? ' mdl-navigation__link--current' : ''
          return <a className={"mdl-navigation__link " +selected_class } key={"lesson-" + lesson.id} 
            href={"#" + key}
            onClick={(e) => {
              e.preventDefault();
              let layout = document.querySelector('.mdl-layout');
              layout.MaterialLayout.toggleDrawer();
              // this.setLesson(lesson.id)}}
              this.props.onSetCurrentLesson(lesson.id);
            }}
            >
            {lesson.name} 
          </a>
          })}
        </nav>
      </div>
    }
    return content
  }
}

const mapStateToProps = state => {
  return {
    currentLesson: state.currentLesson
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSetCurrentLesson: (lesson_id) => dispatch({type: 'SET_LESSON', lesson_id: lesson_id})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Menu)