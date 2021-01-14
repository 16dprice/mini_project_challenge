import React from 'react';
import ReactDOM from 'react-dom';
import './styles/material-icon.css';
import './index.css';
import './styles/card.css';
import App from './App';

import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from "./reducers";

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
