import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as $ from 'jquery';

import { App } from './app';

// interface SignalR {
//     controlHub: ControlHub;
// }
// interface ControlHub {
//     client: ControlHubClient;
//     server: ControlHubServer;
// }
// interface ControlHubClient {
//     //addNewMessageToPage : (name : number, message : string) => void;
// }
// interface ControlHubServer {
//     //send(name: string, message: string): JQueryPromise<void>;
// }

//
// interface ControlHub {
// }
//
//
//             var connection = jQuery.connection.hub;
//             var controlHub = jQuery.connection.controlHub;

var connection = jQuery.hubConnection();
connection.logging = true;

var controlHub = connection.createHubProxy('controlHub')
console.log(controlHub)

const includeClientMethods = () => {
  controlHub.on('switchLightOn', (id: string | number) => {
    console.log(id + 'switched on on client')
  })
  controlHub.on('switchLightOff', (id: string | number) => {
    console.log(id + 'switched off on client')
  })
  controlHub.on('switchAllLightsOn', () => {
    console.log('all lights switched on on client')
  })
  controlHub.on('switchAllLightsOff', () => {
    console.log('all lights switched off on client')
  })
}

const initConnection = () => {
  connection.start()
    .done(() => {
        console.log(controlHub)
        //console.log('Connect! connection Id=' + jQuery.connection.id);
        controlHub.invoke('switchLightOn', '234').done(() => { console.log('sent'); });
    })
}

includeClientMethods();
initConnection();

ReactDOM.render(
  <App />,
  document.getElementById('page')
)
