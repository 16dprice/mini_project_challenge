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
                <div className="project-details__book-name">
                    <i className="material-icons">book</i>{this.state.project.bookName}
                </div>
                <div className="project-details__language">
                    <i className="material-icons">translate</i>{this.state.project.language}
                </div>
                <div className="project-details__edit-panel">
                    <span className="project-details__completed-checkbox">
                        <input id="completed-checkBox" type="checkbox" onClick={this.handleCompletedCheckbox} />
                        <label for="completed-checkBox">Completed</label>
                    </span>
                    <i className="material-icons delete" onClick={this.handleProjectDelete}>delete</i>
                </div>
            </div>
        )
    }

}