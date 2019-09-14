import './styles.scss';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-widgets/dist/css/react-widgets.css';
import 'semantic-ui-css/semantic.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import dateFnsLocalizer from 'react-widgets-date-fns';

import App from './pages/_app';
import * as serviceWorker from './serviceWorker';
import { Router } from './util/router';
import { ScrollToTop } from './util/ScrollToTop';

dateFnsLocalizer();

ReactDOM.render(
    <Router>
        <ScrollToTop>
            <App />
        </ScrollToTop>
    </Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
