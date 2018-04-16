import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'

import './index.css';
import './dynamic-type-sizes/medium.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

import { hydrate, render } from 'react-dom';
import {IntlProvider, addLocaleData} from 'react-intl';
import da from 'react-intl/locale-data/da';

// https://github.com/yahoo/react-intl/wiki#loading-locale-data
addLocaleData([...da]);

const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
  hydrate(
    <IntlProvider locale="da-DK">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </IntlProvider>,
  rootElement);
} else {
  render(
    <IntlProvider locale="da-DK">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </IntlProvider>,
    rootElement);
}
