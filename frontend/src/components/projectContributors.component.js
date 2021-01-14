import React, {Component} from "react";
import {AddContributor} from "./addContributor.component";
import { Link } from 'react-router-dom';
import ProjectApiAdapter from "../api/projectApiAdapter";

export default class ProjectContributors extends Component {

    constructor(props) {
        super(props);

        this.handleContributorDelete = this.handleContributorDelete.bind(this);
        this.handleContributorAdd = this.handleContributorAdd.bind(this);

        this.state = {
            project: this.props.project
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.project !== prevProps.project) {
            this.setState({
                project: {
                    ...this.props.project,
                    contributors: this.props.project.contributors
                },
            });
        }
    }

    handleContributorDelete(contributorToBeDeleted) {
        ProjectApiAdapter.removeContributorFromProject(this.state.project.id, contributorToBeDeleted.id);

        const newContributors = this.state.project.contributors.filter(
            contributor => contributor.id !== contributorToBeDeleted.id
        );

        this.setState({
            project: {
                ...this.state.project,
                contributors: newContributors
            }
        });
    }

    handleContributorAdd(newContributor) {
        ProjectApiAdapter.addContributorToProject(this.state.project.id, [newContributor.id]);

        let newContributors = this.state.project.contributors;
        newContributors.push(newContributor);

        this.setState({
            project: {
                ...this.state.project,
                contributors: newContributors
            }
        });
    }

    getContributorsList() {
        return this.state.project.contributors.map(contributor => {
            return (
                <div key={contributor.username} className="project-contributors__row">
                    <Link to={`/edit-user/${contributor.id}`}>
                        <u>{contributor.firstName} {contributor.lastName}</u>
                    </Link>
                    <i className="material-icons delete actionIcon" 
                        onClick={() => this.handleContributorDelete(contributor)}>delete
                    </i>
                </div>
            )
        });
    }

    render() {
        return (
            <div className="project-details__contributors">
                <p className="project-contributors__header">Contributors</p>
                <div className="project-details__contributor-names">
                    {this.getContributorsList()}
                </div>
                <div className="project-details__add-contributor">
                    <AddContributor project={this.state.project} handleContributorAdd={this.handleContributorAdd} />
                </div>
            </div>
        )
    }

}