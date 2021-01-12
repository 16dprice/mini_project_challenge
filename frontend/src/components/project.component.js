import React, {Component} from 'react';
import {Link} from "react-router-dom";

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
                <span className="card__header">{this.state.project.bookName}</span>
                <span className="card__subHeader">{this.state.project.language}</span>
                <Link to={`/edit-project/${this.state.project.id}`}>Select</Link>
            </>
        );
    }

}