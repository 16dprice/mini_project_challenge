import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import UserApiAdapter from "../api/userApiAdapter";
import ProjectApiAdapter from "../api/projectApiAdapter";
import '../styles/user-detail.css'
import 'react-notifications/lib/notifications.css';
import {NotificationManager, NotificationContainer} from "react-notifications";

export default class UserDetails extends Component {

    constructor(props) {
        super(props);

        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.updateUser = this.updateUser.bind(this);

        this.state = {
            user: {
                userId: props.match.params.userId
            },
            projectsContributedTo: [],
            editingUser: false,
            hasEditedUser: false
        };
    }

    componentDidMount() {
        this.setUserInState(this.state.user.userId);
        this.setProjectsContributedToInState(this.state.user.userId);
    }

    setUserInState(userId) {
        UserApiAdapter.getUserById(userId)
            .then(res => {
                this.setState({
                    user: res
                })
            });
    }

    setProjectsContributedToInState(userId) {
        ProjectApiAdapter.getProjectsByUserId(userId)
            .then(projectsContributedTo => this.setState({ projectsContributedTo }))
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

    createUserUpdateSuccessNotification() {
        return NotificationManager.success(
            `User "${this.state.user.username}" updated to "${this.state.user.firstName} ${this.state.user.lastName}".`,
            'User Updated'
        )
    }

    updateUser(e) {
        UserApiAdapter.updateUser(
            this.state.user.id,
            this.state.user.firstName,
            this.state.user.lastName
        )
            .then(() => {
                this.createUserUpdateSuccessNotification()
                this.setUserInState(this.state.user.id)
            })

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
                <NotificationContainer />
                <div className="breadcrumb-filter-group">
                    <Link to={'/users'}><u>Users</u></Link> &#8594; <span style={{ color: 'red' }}>{this.state.user.username}</span>
                </div>
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