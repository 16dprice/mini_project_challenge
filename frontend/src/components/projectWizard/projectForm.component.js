import React, {Component} from "react";
import { connect } from 'react-redux';
import LanguageSelectPage from "./languageSelectPage.component";

class ProjectForm extends Component {

    constructor(props) {
        super(props);

        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);

        this.state = {
            page: 1
        }
    }

    nextPage() {
        this.setState({ page: this.state.page + 1 });
    }

    previousPage() {
        this.setState({ page: this.state.page - 1 });
    }

    render() {
        const { onSubmit } = this.props;
        const { page } = this.state;

        return (
            <div>
                {page === 1 && <div><LanguageSelectPage /></div>}
                {page === 2 && <div>Second Page</div>}
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