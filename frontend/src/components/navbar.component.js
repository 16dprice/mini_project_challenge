import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends Component {

    render() {
        return (
            <nav>
                <Link className="app-title" to="/projects">Mini Project</Link>
                <Link className="nav-link" to="/projects">PROJECTS</Link>
                <Link className="nav-link" to="/users">USERS</Link>
            </nav>
        )
    }

}