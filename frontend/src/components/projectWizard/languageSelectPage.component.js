import React, {Component} from 'react';
import {connect} from 'react-redux';
import {selectLanguage, deselectLanguage} from "../../actions/projectCreationActions";
import LanguageApiAdapter from "../../api/languageApiAdapter";

class LanguageSelectPage extends Component {

    renderLanguages() {
        return LanguageApiAdapter.getLanguages().map(language => {
            return (
                <div key={language.slug} 
                    onClick={() => this.props.selectLanguage(language.slug)}
                    className="project-contributors__row">
                    {language.original_name} ({language.slug})
                </div>
            )
        });
    }

    render() {
        return (
            <>
                <p className="modal-title">Select Language</p>
                <input type="text" placeholder="Start typing a language name or code"/>
                <div className="language-select-list">{this.renderLanguages()}</div>
                <div className="form-control-group-right">
                    <button className="form-button" onClick={() => this.props.deselectLanguage()}>
                            <i className="material-icons">clear</i>Cancel
                    </button>
                    <button className="form-button" onClick={this.props.goToBookSelectPage}>
                        <i className="material-icons">arrow_forward</i>Continue
                    </button>
                </div>
            </>
        )
    }

}

export default connect(
    state => ({
        selectedLanguage: state.selectedLanguage,
    }),
    {selectLanguage, deselectLanguage}
)(LanguageSelectPage);