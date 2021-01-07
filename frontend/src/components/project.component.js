import React, {Component} from 'react';

export default class Project extends Component {

    constructor(props) {
        super(props);

        this.state = {
            bookName: this.props.project.bookName,
            language: this.props.project.language,
            completed: this.props.project.completed
        }
    }

    render() {
        return (
            <>
                <span className="card__header">{this.state.bookName}</span>
                <span className="card__subHeader">{this.state.language}</span>
                <span>Select</span>
            </>
        );
    }

}