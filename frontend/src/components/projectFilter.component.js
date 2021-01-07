import React, {Component} from 'react';

export default class ProjectFilter extends Component {

    render() {
        return (
            <span className="project-filter">
                <input type="radio" id="statusChoice1" name="status" value="all"/>
                <label htmlFor="statusChoice1">all</label>
                <input type="radio" id="statusChoice2" name="status" value="completed"/>
                <label htmlFor="statusChoice2">completed</label>
                <input type="radio" id="statusChoice3" name="status" value="uncompleted"/>
                <label htmlFor="statusChoice3">uncompleted</label>
            </span>
        );
    }

}