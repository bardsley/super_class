/**
 * Created by Adam Bardsley on 19/12/2018.
 */
import React, { Component } from 'react';
class SearchField extends Component {

    render() {
        return <div id="search" className="mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label mdl-textfield--align-right">
            <form action="#" onSubmit={(data) => {
                data.preventDefault() // stop it posting
                let search_term = document.getElementById('theq').value
                window.app.setState({filter_by: search_term })
                window.app.filterStudents(search_term)
            }}>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label mdl-textfield--align-right">
                    <label className="mdl-button mdl-js-button mdl-button--icon" htmlFor="theq">
                        <i className="material-icons">search</i>
                    </label>
                    <div className="mdl-textfield__expandable-holder">
                        <input id="theq" className="mdl-textfield__input" type="text" name="q" />
                    </div>
                </div>
            </form>
        </div>
    }
}

export default SearchField;