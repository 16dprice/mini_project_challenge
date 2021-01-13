import React, {Component} from 'react';
import {connect} from 'react-redux';
import {selectBook, deselectBook} from "../../actions/projectCreationActions";
import BookApiAdapter from "../../api/bookApiAdapter";

class BookSelectPage extends Component {

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

    render() {
        return (
            <>
                <div className="modal-title">Select Book</div>
                <input type="text" placeholder="Start typing a book name or code"/>
                <div className="language-select-list">
                    {this.renderBooks()}
                </div>
                <div className="form-control-group-right">
                    <button className="form-button" onClick={this.props.deselectBook}>
                        <i className="material-icons">clear</i>Cancel
                    </button>
                    <button className="form-button" onClick={this.props.goToLanguageSelectPage}>
                        <i className="material-icons">arrow_back</i>Back
                    </button>
                    <button className="form-button">
                        <i className="material-icons">arrow_forward</i>Create
                    </button>
                </div>
            </>
        )
    }

}

export default connect(
    state => ({
        selectedBook: state.selectedBook,
    }),
    {selectBook, deselectBook}
)(BookSelectPage);