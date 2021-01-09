import { combineReducers } from 'redux';

import projectStatusReducer from "./projectStatus";

const rootReducer = combineReducers({
    projectStatus: projectStatusReducer
});

export default rootReducer;