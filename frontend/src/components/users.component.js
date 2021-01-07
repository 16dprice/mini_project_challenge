import React, {Component} from 'react';
import Card from './card.component';
import User from './user.component';
import NewUser from './newUser.component';

import UserApiAdapter from "../api/userApiAdapter";

export default class Users extends Component {

    getUserObjects() {
        return UserApiAdapter.userList();
    }

    getNewUserCard() {
        return <Card content={ <NewUser /> } />;
    }

    getUserCards() {
        return this.getUserObjects().map(user => {
            return <Card content={ <User user={user} /> } />
        });
    }

    render() {
        return (
            <div>
                <div>Users</div>
                <div className="card-grid">
                    {this.getNewUserCard()}
                    {this.getUserCards()}
                </div>
            </div>
        )
    }

}