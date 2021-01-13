import React, {Component} from 'react';

import { connect } from 'react-redux';

import Card from './card.component';
import Project from './project.component';
import NewProject from "./newProject.component";
import ProjectFilter from "./projectFilter.component";

import ProjectApiAdapter from '../api/projectApiAdapter';

class ProjectsList extends Component {

    getNewProjectCard() {
        return <Card key="new" content={ <NewProject /> } />;
    }

    getAllProjectObjects() {
        return ProjectApiAdapter.projectList();
    }

    getCompletedProjectObjects() {
        return ProjectApiAdapter.completedProjectList();
    }

    getUncompletedProjectObjects() {
        return ProjectApiAdapter.uncompletedProjectList();
    }

    getProjectCardsFromProjectObjects(projectObjects) {
        return projectObjects.map(project => {
            return <Card key={project.id} content={ <Project project={project} /> } />
        });
    }

    getProjectCards() {
        switch(this.props.status) {
            case 'completed':
                return this.getProjectCardsFromProjectObjects(this.getCompletedProjectObjects());
            case 'uncompleted':
                return this.getProjectCardsFromProjectObjects(this.getUncompletedProjectObjects());
            case 'all':
            default:
                return this.getProjectCardsFromProjectObjects(this.getAllProjectObjects());
        }
    }

    render() {
        return (
            <div>
                <div className="breadcrumb-filter-group">
                    <span>Projects</span>
                    <ProjectFilter />
                </div>
                <div className="card-container">
                    {this.getNewProjectCard()}
                    {this.getProjectCards()}
                </div>
            </div>
        )
    }

}

export default connect(
    state => ({ status: state.projectStatus })
)(ProjectsList);