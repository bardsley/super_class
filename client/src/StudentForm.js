/**
 * Created by Adam Bardsley on 19/12/2018.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from './store/actions'

var MDLite = require('material-design-lite/material');
window.componentHandler = MDLite.componentHandler;

class StudentForm extends Component {
    OLDcreateStudent() {
        let full_name = document.getElementById('full_name').value
        let email = document.getElementById('email').value
        let phone = document.getElementById('phone').value
        window.app.post('/api/students', {
            full_name: full_name,
            email: email,
            phone_number: phone,
        })
        .then(
            student => {
                window.app.setState({student: student})
                let origStudents = window.app.state.students
                console.log(origStudents)
                origStudents.push(student)
                console.log(origStudents)
                window.app.setState({students: origStudents })
            }
        )
    }

    componentDidMount() {
        if(window.componentHandler) { window.componentHandler.upgradeDom() }
    }
    componentDidUpdate() {
        if(window.componentHandler) { window.componentHandler.upgradeDom() }
    }

    render() {
        return<form action="#" onSubmit={(form) => {
            form.preventDefault() // stop it posting
            this.props.onSubmitCreateForm(form)
        }}>

            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input className="mdl-textfield__input" type="text" id="full_name"/>
                    <label className="mdl-textfield__label" htmlFor="name"><i className="material-icons">person</i>Name</label>
            </div>

            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input className="mdl-textfield__input" type="text" id="email"/>
                <label className="mdl-textfield__label" htmlFor="email"><i className="material-icons">email</i>Email</label>
            </div>

            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input className="mdl-textfield__input" type="text" id="phone"/>
                <label className="mdl-textfield__label" htmlFor="phone"><i className="material-icons">phone</i>Phone</label>
            </div><br/>
            <TextButton cta="Create Student"></TextButton>
        </form>
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
        onSubmitCreateForm: (form) => dispatch(actions.createStudent(form)),
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