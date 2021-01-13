import React, {Component} from 'react';
import {connect} from 'react-redux';
import {selectBook, deselectBook, deselectLanguage} from "../../actions/projectCreationActions";
import BookApiAdapter from "../../api/bookApiAdapter";

class BookSelectPage extends Component {

    constructor(props) {
        super(props);

        this.handleCancel = this.handleCancel.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
    }

    renderBooks() {
        return BookApiAdapter.getBooks().map(book => {
            return (
                <div key={book.slug}
                     className="project-contributors__row"
                     onClick={() => this.props.selectBook(book.slug)}>
                    {book.name} ({book.slug})
                </div>
            )
        });
    }

    handleCancel() {
        this.props.deselectBook();
        this.props.deselectLanguage();
        this.props.handleClose();
    }

    handleCreate() {
        // TODO: make an api call to create
        console.log('Making api call to create project...');
        this.props.deselectBook();
        this.props.deselectLanguage();
        this.props.handleClose();
    }

    canCreate() {
        return (
            this.props.selectedLanguage !== '' &&
            this.props.selectedBook !== ''
        );
    }

    render() {
        return (
            <>
                <div className="modal-title">Select Book</div>
                <input type="text" placeholder="Start typing a book name or code"/>
                <div className="language-select-list">
                    {this.renderBooks()}
                </div>
                <div className="form-control-group-right">
                    <button className="form-button" onClick={this.handleCancel}>
                        <i className="material-icons">clear</i>Cancel
                    </button>
                    <button className="form-button" onClick={this.props.goToLanguageSelectPage}>
                        <i className="material-icons">arrow_back</i>Back
                    </button>
                    <button className="form-button" onClick={this.handleCreate} disabled={!this.canCreate()}>
                        <i className="material-icons">arrow_forward</i>Create
                    </button>
                </div>
            </>
        )
    }

}

export default connect(
    state => ({
        selectedLanguage: state.selectedLanguage,
        selectedBook: state.selectedBook
    }),
    {selectBook, deselectBook, deselectLanguage}
)(BookSelectPage);