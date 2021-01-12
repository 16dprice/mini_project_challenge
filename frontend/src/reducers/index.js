import { combineReducers } from 'redux';

import projectStatusReducer from "./projectStatus";
import {projectCreationLanguageSelectReducer, projectCreationBookSelectReducer} from "./projectCreation";

const rootReducer = combineReducers({
    projectStatus: projectStatusReducer,
    languageSelection: projectCreationLanguageSelectReducer,
    bookSelection: projectCreationBookSelectReducer
});

export default rootReducer;