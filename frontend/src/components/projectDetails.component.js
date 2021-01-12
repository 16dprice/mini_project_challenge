import React, {Component} from 'react';
import ProjectApiAdapter from "../api/projectApiAdapter";
import ProjectDescription from "./projectDescription.component";
import ProjectContributors from "./projectContributors.component";

export default class ProjectDetails extends Component {

    constructor(props) {
        super(props);

        const project = ProjectApiAdapter.getProjectById(props.match.params.projectId);

        this.state = {
            project
        }
    }

    render() {
        return (
            <div>
                <div><u>Projects</u> &#8594; {this.state.project.bookName}</div>
                <div className="project-details">
                    <ProjectDescription project={this.state.project} />
                    <ProjectContributors project={this.state.project} />
                </div>
            </div>
        )
    }

}