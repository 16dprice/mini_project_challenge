import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class Project extends Component {

    constructor(props) {
        super(props);

        this.state = {
            project: this.props.project
        }
    }

    render() {
        return (
            <>
                <span className="card__header">
                    <i className="material-icons">book</i>
                    {this.state.project.bookName}
                </span>
                <span className="card__subHeader">
                    <i className="material-icons">translate</i>
                    {this.state.project.language}
                </span>
                <Link className="card__button" to={`/edit-project/${this.state.project.id}`}>
                    <i className="material-icons">touch_app</i>Select
                </Link>
            </>
        );
    }

}