import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedTab: ''
        }
    }

    render() {
        const isProjectsTab = this.state.selectedTab === 'projects';
        const isUsersTab = this.state.selectedTab === 'users';

        return (
            <nav>
                <Link className="app-title" to="/projects">Mini Project</Link>
                <Link className={"nav-link " + (isProjectsTab ? "selected" : '')} to="/projects"
                      onClick={() => this.setState({selectedTab: 'projects'})}>PROJECTS</Link>
                <Link className={"nav-link " + (isUsersTab ? "selected" : '')} to="/users"
                      onClick={() => this.setState({selectedTab: 'users'})}>USERS</Link>
            </nav>
        )
    }

}