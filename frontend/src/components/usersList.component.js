import React, {Component} from 'react';
import Card from './card.component';
import User from './user.component';
import NewUser from './newUser.component';

import UserApiAdapter from "../api/userApiAdapter";

export default class UsersList extends Component {

    getUserObjects() {
        return UserApiAdapter.userList();
    }

    getNewUserCard() {
        return <Card key="new" content={ <NewUser /> } />;
    }

    getUserCards() {
        return this.getUserObjects().map(user => {
            return <Card key={user.username} content={ <User user={user} /> } />
        });
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