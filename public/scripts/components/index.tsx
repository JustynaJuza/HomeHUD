import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Hud } from './hud';

ReactDOM.render(
    <Hud compiler="TypeScript" framework="React" />,
    document.getElementById('hud')
);