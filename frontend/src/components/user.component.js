import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class User extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user,
        }
    }

    render() {
        return (
            <>
                <span className="card__header">{this.state.user.username}</span>
                <span className="card__subHeader">
                    <div>{this.state.user.firstName}</div>
                    <div>{this.state.user.lastName}</div>
                </span>
                <Link className="card__button" to={`/edit-user/${this.state.user.id}`}>
                    <i className="material-icons">touch_app</i>Select
                </Link>
            </>
        );
    }
    
}