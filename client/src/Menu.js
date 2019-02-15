import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './store/actions'

class Menu extends Component {
  constructor () {
    super()
    this.state = {}
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
          let selected_class = null
          if(this.props.lesson) {
            selected_class = lesson.id === this.props.lesson.id ? ' mdl-navigation__link--current' : ''
          }
          return <a className={"mdl-navigation__link " +selected_class } key={"lesson-" + lesson.id} 
            href={"#" + key}
            onClick={(e) => {
              e.preventDefault();
              let layout = document.querySelector('.mdl-layout');
              layout.MaterialLayout.toggleDrawer();
              this.props.onSelectLesson(lesson);
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
    lesson: state.lesson
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSelectLesson: (lesson) => dispatch(actions.getLesson(lesson.id))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Menu)