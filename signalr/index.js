const server = require('../server.bundle.js');
const SignalR = require('signalrjs');
const database = require('../mongo')

const signalR = SignalR();

var currentLightsState;
database.getLightsState().then(function(state){
  console.log(state)
  currentLightsState = { all: state };
  server.store.dispatch(server.SET_CURRENT_LIGHTS_STATE(currentLightsState));
});

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
  GET_CURRENT_LIGHTS_STATE: function() {
    // database.getState().then(function(currentState){
      console.log(currentLightsState)
    //  this.clients.all.invoke(server.SET_LIGHT_ON).withArgs(id)
      this.clients.all.invoke(server.SET_CURRENT_LIGHTS_STATE).withArgs([currentLightsState]);
    // });
    //   console.log('called')
      //setTimeout(function(){console.log('timed');
      //     this.clients.all.invoke(server.SET_LIGHT_ON).withArgs(id)}, 12000);
    //this.clients.all.invoke(server.SET_LIGHT_ON).withArgs('234')

  }
})

module.exports = signalR;
