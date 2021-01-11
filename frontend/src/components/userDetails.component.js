import React, {Component} from 'react';

import UserApiAdapter from "../api/userApiAdapter";
import ProjectApiAdapter from "../api/projectApiAdapter";

export default class UserDetails extends Component {

    constructor(props) {
        super(props);

        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);

        const user = UserApiAdapter.getUserById(props.match.params.userId);
        const projectsContributedTo = ProjectApiAdapter.getProjectsByUserId(user.id);

        this.state = {
            user,
            projectsContributedTo
        };
    }

    handleFirstNameChange(e) {
        this.setState({
            user: {...this.state.user, firstName: e.target.value}
        });
    }

    handleLastNameChange(e) {
        this.setState({
            user: {...this.state.user, lastName: e.target.value}
        });
    }

    getProjectsContributedTo() {
        return this.state.projectsContributedTo.map(project => {
            return <div key={project.id}><u>{project.language} - {project.bookName}</u></div>
        });
    }

    render() {
        return (
            <div>
                <div><u>Users</u> &#8594; {this.state.user.username}</div>
                <div className="user-details">
                    <div className="user-details__names">
                        <span className="user-details__username">{this.state.user.username}</span>
                        <span className="user-details__first-and-last-names">
                            <div><input type="text" readOnly={false} value={this.state.user.firstName}
                                    onChange={this.handleFirstNameChange}/></div>
                            <div><input type="text" readOnly={false} value={this.state.user.lastName}
                                    onChange={this.handleLastNameChange}/></div>
                        </span>
                        <button>Edit</button>
                    </div>
                    <div className="user-details__projects">
                        {this.getProjectsContributedTo()}
                    </div>
                </div>
            </div>
        );
    }
}