import React, {Component} from "react";

export default class ProjectDescription extends Component {

    constructor(props) {
        super(props);

        this.state = {
            project: this.props.project
        }
    }

    render() {
        return (
            <div className="project-details__project-description">
                <div className="project-details__book-name">{this.state.project.bookName}</div>
                <div className="project-details__language">{this.state.project.language}</div>
                <div className="project-details__edit-panel">
                    <span className="project-details__completed-checkbox">
                        <input type="checkbox"/>Completed
                    </span>
                    <span className="project-details__delete-button">
                        <button>Delete</button>
                    </span>
                </div>
            </div>
        )
    }

}