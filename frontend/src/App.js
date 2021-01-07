import Navbar from './components/navbar.component';
import Projects from './components/projects.component';

import {BrowserRouter as Router, Route} from "react-router-dom";

function App() {
    return (
        <Router>
            <div>
                <Navbar/>
            </div>
            <Route path="/projects" component={Projects}/>
        </Router>
    );
}

export default App;
