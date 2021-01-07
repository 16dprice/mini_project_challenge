import React, {Component} from 'react';

export default class User extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: this.props.user.username,
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName,
        }
    }

    render() {
        return (
            <>
                <span className="card__header">{this.state.username}</span>
                <span className="card__subHeader">
                    <div>{this.state.firstName}</div>
                    <div>{this.state.lastName}</div>
                </span>
                <span>Select</span>
            </>
        );
    }

}