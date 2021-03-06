import React, {Component} from "react";
import ProjectApiAdapter from "../api/projectApiAdapter";

export default class ProjectDescription extends Component {

    constructor(props) {
        super(props);

        this.handleCompletedCheckbox = this.handleCompletedCheckbox.bind(this);
        this.handleProjectDelete = this.handleProjectDelete.bind(this);

        this.state = {
            project: this.props.project
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.project !== prevProps.project) {
            this.setState({
                project: this.props.project
            });
        }
    }

    handleCompletedCheckbox(e) {
        ProjectApiAdapter.updateProjectCompletionStatus(this.state.project.id, e.target.checked);
        this.setState({
            project: {
                ...this.state.project,
                completed: e.target.checked
            }
        })
    }

    handleProjectDelete(e) {
        ProjectApiAdapter.deleteProject(this.state.project.id);
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
                        <input id="completed-checkBox" type="checkbox" onChange={this.handleCompletedCheckbox}
                               checked={!!this.state.project.completed}/>
                        <label htmlFor="completed-checkBox">Completed</label>
                    </span>
                    <i className="material-icons delete actionIcon" onClick={this.handleProjectDelete}>delete</i>
                </div>
            </div>
        )
    }

}