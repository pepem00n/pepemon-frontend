import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import LogRocket from 'logrocket';
// import './i18n';

LogRocket.init('h4pvlb/pepemon');

document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    ReactDOM.render(<App />, document.getElementById('root'));
  }
}
