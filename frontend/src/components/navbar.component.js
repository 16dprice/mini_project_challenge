import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends Component {

    render() {
        return (
            <nav>
                <ul>
                    <li><Link to="/projects">Mini Project</Link></li>
                    <li><Link to="/projects">PROJECTS</Link></li>
                    <li><Link to="/users">USERS</Link></li>
                </ul>
            </nav>
        )
    }

}