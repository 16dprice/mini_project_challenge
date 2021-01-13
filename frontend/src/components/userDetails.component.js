import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import UserApiAdapter from "../api/userApiAdapter";
import ProjectApiAdapter from "../api/projectApiAdapter";
import '../styles/user-detail.css'

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
            return (
                <button onClick={this.updateUser} className="edit-button"
                    disabled={!this.state.hasEditedUser}>
                    <i className="material-icons">save</i>Save
                </button>
            );
        } else {
            return (
                <button className="edit-button" onClick={() => this.setState({editingUser: true})}>
                    <i className="material-icons">edit</i>Edit
                </button>
            );
        }
    }

    getProjectsContributedTo() {
        return this.state.projectsContributedTo.map(project => {
            return (
                <Link to={`/edit-project/${project.id}`}>
                    <u key={project.id}>{project.language} - {project.bookName}</u>
                </Link>
            );
        });
    }

    render() {
        return (
            <div>
                <div><u>Users</u> &#8594; {this.state.user.username}</div>
                <div className="user-details__container">
                    <div className="user-details__names">
                        <span className="user-details__username">{this.state.user.username}</span>
                        <span className="user-details__first-and-last-names">{this.getFirstAndLastNamesInputs()}</span>
                        {this.getEditOrSaveButton()}
                    </div>
                    <div className="user-details__projects">
                        <p className="user-projects__header">Projects</p>
                        <div className="user-projects__link-container">{this.getProjectsContributedTo()}</div>
                    </div>
                </div>
            </div>
        );
    }
}