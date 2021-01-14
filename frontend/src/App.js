import Navbar from './components/navbar.component';
import ProjectsList from './components/projectsList.component';
import UsersList from './components/usersList.component';
import UserDetails from './components/userDetails.component';
import ProjectDetails from './components/projectDetails.component';

import {BrowserRouter as Router, Route} from "react-router-dom";

function App() {
    return (
        <Router>
            <div>
                <Navbar/>
            </div>
            <Route path="/projects" component={ProjectsList} />
            <Route path="/users" component={UsersList} />
            <Route path="/edit-user/:userId" component={UserDetails} />
            <Route path="/edit-project/:projectId" component={ProjectDetails} />
        </Router>
    );
}

export default App;
