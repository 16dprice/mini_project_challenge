import React, {Component} from 'react';
import Card from './card.component';

import ProjectApiAdapter from '../api/projectApiAdapter';

export default class Projects extends Component {

    getProjectObjects() {
        return ProjectApiAdapter.projectList();
    }

    getProjectCards() {
        return this.getProjectObjects().map(project => {
            return <Card header={project.bookName} subHeader={project.language} completed={project.completed} />
        });
    }

    render() {
        return (
            <div>
                {this.getProjectCards()}
            </div>
        )
    }

}