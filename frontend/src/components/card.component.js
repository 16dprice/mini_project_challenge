import React, {Component} from 'react';

export default class Card extends Component {

    render() {
        return (
            <div className="card">
                <span className="card__header">{this.props.header}</span>
                <span className="card__subHeader">{this.props.subHeader}</span>
                <span>Select</span>
            </div>
        );
    }

}