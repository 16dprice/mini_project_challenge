import React, {Component} from 'react';

import {connect} from 'react-redux';
import {all, completed, uncompleted} from "../actions/projectStatusActions";

class ProjectFilter extends Component {

    render() {
        const showingAll = this.props.status === 'all';
        const showingCompleted = this.props.status === 'completed';
        const showingUncompleted = this.props.status === 'uncompleted';

        return (
            <span className="project-filter">
                <input type="radio" id="statusChoice1" name="status" value="all"
                    onClick={() => this.props.all()} checked={showingAll}
                />
                <label htmlFor="statusChoice1">all</label>

                <input type="radio" id="statusChoice2" name="status" value="completed"
                    onClick={() => this.props.completed()} checked={showingCompleted}
                />
                <label htmlFor="statusChoice2">completed</label>

                <input type="radio" id="statusChoice3" name="status" value="uncompleted"
                    onClick={() => this.props.uncompleted()} checked={showingUncompleted}
                />
                <label htmlFor="statusChoice3">uncompleted</label>
            </span>
        );
    }

}

export default connect(
    state => ({ status: state.projectStatus }),
    {all, completed, uncompleted}
)(ProjectFilter);