import React, {Component} from 'react';
import {connect} from 'react-redux';
import {selectBook, deselectBook} from "../../actions/projectCreationActions";
import BookApiAdapter from "../../api/bookApiAdapter";

class BookSelectPage extends Component {

    renderBooks() {
        return BookApiAdapter.getBooks().map(book => {
            return (
                <div key={book.slug} onClick={() => this.props.selectBook(book.slug)}>
                    {book.name} ({book.slug})
                </div>
            )
        });
    }

    render() {
        return (
            <>
                <div>Select Book (Currently selected: {this.props.selectedBook})</div>
                <input type="text"/>
                <div>{this.renderBooks()}</div>
                <div>
                    <button onClick={this.props.deselectBook}>Cancel</button>
                    <button onClick={this.props.goToLanguageSelectPage}>Back</button>
                    <button>Create</button>
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