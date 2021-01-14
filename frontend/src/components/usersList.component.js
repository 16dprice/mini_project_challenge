import React, {Component} from 'react';
import Card from './card.component';
import User from './user.component';
import {NewUser} from './newUser.component';

import UserApiAdapter from "../api/userApiAdapter";

export default class UsersList extends Component {

    constructor(props) {
        super(props);

        this.getUserObjects = this.getUserObjects.bind(this);

        this.state = {
            users: []
        }
    }

    componentDidMount() {
        this.getUserObjects();
    }

    getUserObjects() {
        UserApiAdapter.userList().then(data => {
            this.setState({
                users: data
            })
        });
    }

    getNewUserCard() {
        return <Card key="new" content={ <NewUser getUserObjects={this.getUserObjects} /> } />;
    }

    getUserCards() {
        return this.state.users.map(user => {
            return <Card key={user.username} content={<User user={user}/>}/>
        })
    }

    render() {
        return (
            <div>
                <div className="breadcrumb-filter-group">Users</div>
                <div className="card-container">
                    {this.getNewUserCard()}
                    {this.getUserCards()}
                </div>
            </div>
        )
    }

}