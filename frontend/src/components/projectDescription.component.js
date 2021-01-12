import React, {Component} from "react";

export default class ProjectDescription extends Component {

    constructor(props) {
        super(props);

        this.handleCompletedCheckbox = this.handleCompletedCheckbox.bind(this);
        this.handleProjectDelete = this.handleProjectDelete.bind(this);

        this.state = {
            project: this.props.project
        }
    }

    handleCompletedCheckbox(e) {
        // TODO: update project completion status via api
    }

    handleProjectDelete(e) {
        // TODO: delete project via api
        window.location.pathname = '/projects';
    }

    render() {
        return (
            <div className="project-details__project-description">
                <div className="project-details__book-name">{this.state.project.bookName}</div>
                <div className="project-details__language">{this.state.project.language}</div>
                <div className="project-details__edit-panel">
                    <span className="project-details__completed-checkbox">
                        <input type="checkbox" onClick={this.handleCompletedCheckbox}/>Completed
                    </span>
                    <span className="project-details__delete-button">
                        <button onClick={this.handleProjectDelete}>Delete</button>
                    </span>
                </div>
            </div>
        )
    }

}