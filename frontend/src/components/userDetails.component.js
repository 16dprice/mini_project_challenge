import React, {Component} from 'react';

import UserApiAdapter from "../api/userApiAdapter";
import ProjectApiAdapter from "../api/projectApiAdapter";
import {Button} from "@material-ui/core";

export default class UserDetails extends Component {

    constructor(props) {
        super(props);

        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.updateUser = this.updateUser.bind(this);

        const user = UserApiAdapter.getUserById(props.match.params.userId);
        const projectsContributedTo = ProjectApiAdapter.getProjectsByUserId(user.id);

        this.state = {
            user,
            projectsContributedTo,
            editingUser: false,
            hasEditedUser: false
        };
    }

    handleFirstNameChange(e) {
        this.setState({
            user: {...this.state.user, firstName: e.target.value},
            hasEditedUser: true
        });
    }

    handleLastNameChange(e) {
        this.setState({
            user: {...this.state.user, lastName: e.target.value},
            hasEditedUser: true
        });
    }

    updateUser(e) {
        if(this.state.hasEditedUser) {
            // TODO: make POST request to update user here
            console.log(this.state.user);
        }

        this.setState({
            editingUser: false,
            hasEditedUser: false
        });
    }

    getFirstAndLastNamesInputs() {
        if (this.state.editingUser) {
            return <>
                <div><input type="text" value={this.state.user.firstName} onChange={this.handleFirstNameChange}/></div>
                <div><input type="text" value={this.state.user.lastName} onChange={this.handleLastNameChange}/></div>
            </>
        } else {
            return <>
                <div>{this.state.user.firstName}</div>
                <div>{this.state.user.lastName}</div>
            </>
        }
    }

    getEditOrSaveButton() {
        if(this.state.editingUser) {
            return <Button onClick={this.updateUser} disabled={!this.state.hasEditedUser}>Save</Button>
        } else {
            return <Button onClick={() => this.setState({editingUser: true})}>Edit</Button>
        }
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
                        <span className="user-details__first-and-last-names">{this.getFirstAndLastNamesInputs()}</span>
                        {this.getEditOrSaveButton()}
                    </div>
                    <div className="user-details__projects">
                        {this.getProjectsContributedTo()}
                    </div>
                </div>
            </div>
        );
    }
}