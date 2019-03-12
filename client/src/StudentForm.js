/**
 * Created by Adam Bardsley on 19/12/2018.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from './store/actions'

var MDLite = require('material-design-lite/material');
window.componentHandler = MDLite.componentHandler;

class StudentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            full_name: this.props.query ? this.props.query : '',
            email: '',
            phone: ''
        };
    }

    handleChange = (event) => {
        if(event.target.id === 'full_name') { this.setState({full_name: event.target.value}) }
        if(event.target.id === 'email') { this.setState({email: event.target.value}) }
        if(event.target.id === 'phone') { this.setState({phone: event.target.value}) }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmitCreateForm(this.state,this.props.lesson)
    }

    render() {
        return<form id="createStudentForm" action="/#" onSubmit={this.handleSubmit}>
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input className="mdl-textfield__input" type="text" id="full_name" key="full_name" autoFocus value={this.state.full_name} onChange={this.handleChange}/>
                    <label className="mdl-textfield__label" htmlFor="name"><i className="material-icons">person</i>Name</label>
            </div>

            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input className="mdl-textfield__input" type="text" id="email" value={this.state.email} onChange={this.handleChange}/>
                <label className="mdl-textfield__label" htmlFor="email"><i className="material-icons">email</i>Email</label>
            </div>

            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input className="mdl-textfield__input" type="text" id="phone" value={this.state.phone} onChange={this.handleChange}/>
                <label className="mdl-textfield__label" htmlFor="phone"><i className="material-icons">phone</i>Phone</label>
            </div><br/>
            <TextButton cta="Create Student" onClick={this.submit}></TextButton> or <a href="#back_to_listing" onClick={() => this.props.onLoadStudents()} >Back to Student List</a>
        </form>
    }

    componentDidMount() {
        if(window.componentHandler) { window.componentHandler.upgradeDom() }
    }
    componentDidUpdate() {
        if(window.componentHandler) { window.componentHandler.upgradeDom() }
    }
}


const mapStateToProps = state => {
    return {
        lesson: state.content.lesson,
        students: state.content.students,
        query: state.content.query
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmitCreateForm: (student,lesson) => dispatch(actions.createStudent(student,lesson)),
        onLoadStudents: () => dispatch(actions.loadStudents())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(StudentForm);

// Additional Component

class TextButton extends Component {
    constructor (props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        if(window.componentHandler) { window.componentHandler.upgradeDom() }
    }
    componentDidUpdate() {
        if(window.componentHandler) { window.componentHandler.upgradeDom() }
    }


    render() {
        return <button onClick={this.props.onClick} className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
            {this.props.cta}
        </button>
    }
}