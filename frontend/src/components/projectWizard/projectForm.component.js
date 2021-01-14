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

    getLanguagePage() {
        return (
            <div>
                <LanguageSelectPage
                    goToBookSelectPage={this.goToBookSelectPage}
                    handleClose={this.props.handleClose}
                />
            </div>
        )
    }

    getBookPage() {
        return (
            <div>
                <BookSelectPage
                    goToLanguageSelectPage={this.goToLanguageSelectPage}
                    handleClose={this.props.handleClose}
                    setProjectsListState={this.props.setProjectsListState}
                />
            </div>
        )
    }

    getCurrentPage() {
        switch (this.state.page) {
            case 'bookSelectPage':
                return this.getBookPage()
            case 'languageSelectPage':
            default:
                return this.getLanguagePage()
        }
    }

    render() {
        return (
            <div className={this.props.className}>
                {this.getCurrentPage()}
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