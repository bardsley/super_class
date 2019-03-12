import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './store/actions'

class Menu extends Component {
  constructor () {
    super()
  }

  componentDidMount() {
    this.props.onGetLessons() 
  }

  render() {
    // let lessons = this.state.lessons
    let lessons = this.props.lessons    
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
          let start_datetime = null
          if(lesson.start_at) {
            start_datetime = new Intl.DateTimeFormat('en-GB',{
              year: 'numeric',
              month: 'long',
              day: '2-digit'
            }).format(Date.parse(lesson.start_at))
          }
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
            <span style={{fontSize: '80%', marginTop: '-0.8em', display: 'block', color: 'rgb(0,0,0,0.5)'}}>{start_datetime}</span>
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
    lesson: state.content.lesson,
    lessons: state.content.lessons,
    isAuthenticated: state.auth.isAuthenticated
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSelectLesson: (lesson) => dispatch(actions.getLesson(lesson.id)),
    onGetLessons: () => dispatch(actions.getLessons()),
    onLoggedOut: () => dispatch(actions.logoutUser())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Menu)