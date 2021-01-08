import Navbar from './components/navbar.component';
import ProjectsList from './components/projectsList.component';
import UsersList from './components/usersList.component';

import {BrowserRouter as Router, Route} from "react-router-dom";

function App() {
    return (
        <Router>
            <div>
                <Navbar/>
            </div>
            <Route path="/projects" component={ProjectsList} />
            <Route path="/users" component={UsersList} />
        </Router>
    );
}

export default App;
