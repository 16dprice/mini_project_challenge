import React, {Component} from 'react';
import ProjectApiAdapter from "../api/projectApiAdapter";
import ProjectDescription from "./projectDescription.component";
import ProjectContributors from "./projectContributors.component";
import '../styles/project-detail.css'

export default class ProjectDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            project: {
                id: props.match.params.projectId,
                contributors: []
            }
        }
    }

    componentDidMount() {
        this.setProjectInState();
    }

    setProjectInState() {
        ProjectApiAdapter.getProjectById(this.state.project.id)
            .then(project => {
                this.setState({ project });
            });
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