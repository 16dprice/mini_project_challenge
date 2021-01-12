import React, {Component} from "react";

export default class ProjectContributors extends Component {

    constructor(props) {
        super(props);

        this.state = {
            project: this.props.project
        }
    }

    getContributorsList() {
        return this.state.project.contributors.map(contributor => {
            return (
                <div key={contributor.username}>
                    <span><u>{contributor.firstName} {contributor.lastName}</u></span>
                    <button style={{float: 'right'}}>Delete</button>
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