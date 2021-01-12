import React, {Component} from "react";

export default class ProjectContributors extends Component {

    constructor(props) {
        super(props);

        this.handleContributorDelete = this.handleContributorDelete.bind(this);

        this.state = {
            project: this.props.project
        }
    }

    handleContributorDelete(contributorToBeDeleted) {
        // TODO: make delete request to delete contributor here
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

    getContributorsList() {
        return this.state.project.contributors.map(contributor => {
            return (
                <div key={contributor.username}>
                    <span><u>{contributor.firstName} {contributor.lastName}</u></span>
                    <button
                        onClick={() => this.handleContributorDelete(contributor)}
                        style={{float: 'right'}}
                    >
                        Delete
                    </button>
                </div>
            )
        });
    }

    render() {
        return (
            <div className="project-details__contributors">
                <div>Contributors</div>
                <div className="project-details__contributor-names">
                    {this.getContributorsList()}
                </div>
                <div className="project-details__add-contributor">
                    <button>Add Contributor</button>
                </div>
            </div>
        )
    }

}