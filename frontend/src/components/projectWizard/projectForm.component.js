import React, {Component} from "react";
import {connect} from 'react-redux';
import LanguageSelectPage from "./languageSelectPage.component";
import BookSelectPage from "./bookSelectPage.component";

class ProjectForm extends Component {

    constructor(props) {
        super(props);

        this.goToLanguageSelectPage = this.goToLanguageSelectPage.bind(this);
        this.goToBookSelectPage = this.goToBookSelectPage.bind(this);

        this.state = {
            page: 'languageSelectPage'
        }
    }

    goToLanguageSelectPage() {
        this.setState({page: 'languageSelectPage'});
    }

    goToBookSelectPage() {
        this.setState({page: 'bookSelectPage'});
    }

    render() {
        const {page} = this.state;

        return (
            <div className={this.props.className}>
                {page === 'languageSelectPage' &&
                <div><LanguageSelectPage goToBookSelectPage={this.goToBookSelectPage}/></div>}
                {page === 'bookSelectPage' &&
                <div><BookSelectPage goToLanguageSelectPage={this.goToLanguageSelectPage}/></div>}
            </div>
        )
    }

}

export default connect(
    state => ({
        selectedLanguage: state.selectedLanguage,
        selectedBook: state.selectedBook
    })
)(ProjectForm);