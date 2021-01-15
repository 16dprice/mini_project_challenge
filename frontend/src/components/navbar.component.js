import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends Component {

    constructor(props) {
        super(props);

        this.setProjectsAsState = this.setProjectsAsState.bind(this);
        this.setUsersAsState = this.setUsersAsState.bind(this);

        this.state = {
            selectedTab: ''
        }
    }

    componentDidMount() {
        const currentPath = window.location.pathname;

        switch(currentPath) {
            case '/projects':
                this.setProjectsAsState();
                break;
            case '/users':
                this.setUsersAsState();
                break;
            default:
                this.setState({selectedTab: ''});
        }
    }

    setProjectsAsState() {
        this.setState({
            selectedTab: 'projects'
        });
    }

    setUsersAsState() {
        this.setState({
            selectedTab: 'users'
        });
    }

    render() {
        const isProjectsTab = this.state.selectedTab === 'projects';
        const isUsersTab = this.state.selectedTab === 'users';

        return (
            <nav>
                <Link className="app-title" to="/projects" onClick={this.setProjectsAsState}>Mini Project</Link>
                <Link className={"nav-link " + (isProjectsTab ? "selected" : '')} to="/projects"
                      onClick={this.setProjectsAsState}>PROJECTS</Link>
                <Link className={"nav-link " + (isUsersTab ? "selected" : '')} to="/users"
                      onClick={this.setUsersAsState}>USERS</Link>
            </nav>
        )
    }

}