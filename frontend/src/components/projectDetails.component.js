import React, {Component} from 'react';
import ProjectApiAdapter from "../api/projectApiAdapter";
import ProjectDescription from "./projectDescription.component";
import ProjectContributors from "./projectContributors.component";
import '../styles/project-detail.css'

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
                <div className="breadcrumb-filter-group">
                    <u>Projects</u> &#8594; <span style={{ color: 'red' }}>{this.state.project.bookName}</span>
                </div>
                <div className="project-details__container">
                    <ProjectDescription project={this.state.project}/>
                    <ProjectContributors project={this.state.project} />
                </div>
            </div>
        )
    }

}