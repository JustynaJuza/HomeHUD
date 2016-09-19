const server = require('../server.bundle.js');
const SignalR = require('signalrjs');
const database = require('../mongo')

const signalR = SignalR();

var currentLightsState;
database.getLightsState().then(function(state){
  currentLightsState = { all: state };
  server.store.dispatch(server.lightActions.SET_CURRENT_LIGHTS_STATE(currentLightsState));
});

signalR.hub('controlHub', {
  TRY_SET_LIGHT_ON: function(id) {
      database.setLightState(id, 1);
      server.store.dispatch(server.lightActions.SET_LIGHT_ON(id));
      this.clients.all.invoke(server.SET_LIGHT_ON).withArgs(id);
      console.log(id + ' switched on');
  },
  TRY_SET_LIGHT_OFF: function(id) {
      database.setLightState(id, 0);
      server.store.dispatch(server.lightActions.SET_LIGHT_OFF(id));
      this.clients.all.invoke(server.SET_LIGHT_OFF).withArgs(id);
      console.log(id + ' switched off');
  },
  TRY_SET_ALL_LIGHTS_ON: function() {
      database.setAllLights(1);
      server.store.dispatch(server.lightActions.SET_ALL_LIGHTS_ON());
      this.clients.all.invoke(server.SET_ALL_LIGHTS_ON).withArgs();
      console.log('all lights switched on');
  },
  TRY_SET_ALL_LIGHTS_OFF: function() {
      database.setAllLights(0);
      server.store.dispatch(server.lightActions.SET_ALL_LIGHTS_OFF());
      this.clients.all.invoke(server.SET_ALL_LIGHTS_OFF).withArgs();;
      console.log('all lights switched off');
  },
  GET_CURRENT_LIGHTS_STATE: function() {
    //await database.getLightsState().then((state) => {
      console.log(server.store.getState())
      //var currentLightsState = { all: state };
      //server.store.dispatch(server.lightActions.SET_CURRENT_LIGHTS_STATE(currentLightsState));
      this.clients.all.invoke(server.SET_CURRENT_LIGHTS_STATE).withArgs([server.store.getState()]);
    //});
  }
})

module.exports = signalR;
