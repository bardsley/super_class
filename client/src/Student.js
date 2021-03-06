import React, { Component } from 'react';

class Student extends Component {
  // constructor(props) {
  //   super(props)
  // }
  render() {
    return <li className="mdl-list__item mdl-list__item--two-line" data-student-id={this.props.student.id} onClick={() => this.props.onClick()}>
      <span className="mdl-list__item-primary-content">
        <i className="material-icons mdl-list__item-avatar">person</i>
        <span>{this.props.student.first_name} {this.props.student.last_name}</span>
        <span className="mdl-list__item-sub-title">
          {this.props.student.email}<br/>
          {this.props.student.phone_number}
        </span>
      </span>
      <a className="mdl-list__item-secondary-content"  href="#clicked" >
        <span className="mdl-list__item-secondary-action" >
          {
            this.props.active ? 
              <i className="material-icons md-inactive negative">remove_circle</i> 
              : <i className="material-icons md-inactive positive">add_circle_outline</i>
          }
        </span>
      </a>
    </li>
  }
}

export default Student;