import React, {Component} from 'react';
import {connect} from 'react-redux';
import {selectLanguage, deselectLanguage} from "../../actions/projectCreationActions";
import LanguageApiAdapter from "../../api/languageApiAdapter";

class LanguageSelectPage extends Component {

    constructor(props) {
        super(props);
    }

    getLanguages() {
        return LanguageApiAdapter.getLanguages().map(language => {
            return (
                <div key={language.slug} onClick={() => this.props.selectLanguage(language.slug)}>
                    {language.original_name} {language.slug}
                </div>
            )
        });
    }

    render() {
        return (
            <>
                <div>Select Language (Currently selected: {this.props.selectedLanguage})</div>
                <input type="text"/>
                <div>{this.getLanguages()}</div>
                <div>
                    <button onClick={() => this.props.deselectLanguage()}>Cancel</button>
                    <button >Continue</button>
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