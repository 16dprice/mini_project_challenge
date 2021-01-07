import React, {Component} from 'react';
import Card from './card.component';

export default class Projects extends Component {

    getProjectObjects() {
        return [
            {
                bookName: "Mark",
                language: "English"
            },
            {
                bookName: "1 Peter",
                language: "English"
            },
            {
                bookName: "Genesis",
                language: "Espanol"
            }
        ];
    }

    getProjectCards() {
        return this.getProjectObjects().map(project => {
            return <Card header={project.bookName} subHeader={project.language} />
        });
    }

    render() {
        return (
            <div>
                {this.getProjectCards()}
            </div>
        )
    }

}