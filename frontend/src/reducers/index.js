import { combineReducers } from 'redux';

import projectStatusReducer from "./projectStatus";
import {projectCreationLanguageSelectReducer, projectCreationBookSelectReducer} from "./projectCreation";

const rootReducer = combineReducers({
    projectStatus: projectStatusReducer,
    selectedLanguage: projectCreationLanguageSelectReducer,
    selectedBook: projectCreationBookSelectReducer
});

export default rootReducer;