import React, {Component} from 'react';
import Card from './card.component';
import Project from './project.component';
import NewProject from "./newProject.component";

import ProjectApiAdapter from '../api/projectApiAdapter';

export default class Projects extends Component {

    getProjectObjects() {
        return ProjectApiAdapter.projectList();
    }

    getNewProjectCard() {
        return <Card content={ <NewProject /> } />;
    }

    getProjectCards() {
        return this.getProjectObjects().map(project => {
            return <Card content={ <Project project={project} /> } />
        });
    }

    render() {
        return (
            <div>
                <div>Projects</div>
                <div className="card-grid">
                    {this.getNewProjectCard()}
                    {this.getProjectCards()}
                </div>
            </div>
        )
    }

}