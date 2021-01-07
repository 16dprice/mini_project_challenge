import Navbar from './components/navbar.component';
import Projects from './components/projects.component';

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <div>
                <Navbar/>
            </div>
            <div>
                <Route path="/projects" component={Projects} />
            </div>
        </Router>
    );
}

export default App;
