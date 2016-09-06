const server = require('../server.bundle.js');
const SignalR = require('signalrjs');

const signalR = SignalR();

var currentState = currentState || server.initialState;

signalR.hub('controlHub', {
  TRY_SET_LIGHT_ON: function(id) {
      server.store.dispatch(server.lightActions.SET_LIGHT_ON(id));
      this.clients.all.invoke(server.SET_LIGHT_ON).withArgs(id);
      console.log(id + ' switched on');
  },
  TRY_SET_LIGHT_OFF: function(id) {
      server.store.dispatch(server.lightActions.SET_LIGHT_OFF(id));
      this.clients.all.invoke(server.SET_LIGHT_OFF).withArgs(id);
      console.log(id + ' switched off');
  },
  TRY_SET_ALL_LIGHTS_ON: function() {
      server.store.dispatch(server.lightActions.SET_ALL_LIGHTS_ON());
      this.clients.all.invoke(server.SET_ALL_LIGHTS_ON);
      console.log('all lights switched on');
  },
  TRY_SET_ALL_LIGHTS_OFF: function() {
      server.store.dispatch(server.lightActions.SET_ALL_LIGHTS_OFF());
      this.clients.all.invoke(server.SET_ALL_LIGHTS_OFF);
      console.log('all lights switched off');
  },
  GET_CURRENT_LIGHT_STATE: function() {
      this.clients.all.invoke(server.SET_CURRENT_LIGHT_STATE).withArgs(currentState);
  }
})

module.exports = signalR;
