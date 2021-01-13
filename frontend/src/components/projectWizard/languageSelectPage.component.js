import React, {Component} from 'react';
import {connect} from 'react-redux';
import {selectLanguage, deselectLanguage, deselectBook} from "../../actions/projectCreationActions";
import LanguageApiAdapter from "../../api/languageApiAdapter";

class LanguageSelectPage extends Component {

    constructor(props) {
        super(props);

        this.handleCancel = this.handleCancel.bind(this);
    }

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

    handleCancel() {
        this.props.deselectLanguage();
        this.props.deselectBook();
        this.props.handleClose();
    }

    canContinue() {
        return this.props.selectedLanguage !== '';
    }

    render() {
        return (
            <>
                <p className="modal-title">Select Language</p>
                <input type="text" placeholder="Start typing a language name or code"/>
                <div className="language-select-list">{this.renderLanguages()}</div>
                <div className="form-control-group-right">
                    <button className="form-button" onClick={this.handleCancel}>
                        <i className="material-icons">clear</i>Cancel
                    </button>
                    <button className="form-button" onClick={this.props.goToBookSelectPage}
                            disabled={!this.canContinue()}>
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
    {selectLanguage, deselectLanguage, deselectBook}
)(LanguageSelectPage);