import React, {Component} from 'react';

export default class Card extends Component {

    render() {
        return (
            <div>{this.props.header} - {this.props.subHeader}</div>
        );
    }

}