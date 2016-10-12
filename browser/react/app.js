'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer';
import store from '../redux/ReduxApp';

import { Provider } from 'react-redux';


ReactDOM.render(
  <Provider store={store}>
  	<AppContainer />
  </Provider>,
  document.getElementById('app')
);
