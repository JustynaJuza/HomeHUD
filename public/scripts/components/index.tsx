import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from './app';
import { ControlHub } from './controlHub';

const hub = new ControlHub();
hub.init();

ReactDOM.render(
  <App />,
  document.getElementById('page')
)
