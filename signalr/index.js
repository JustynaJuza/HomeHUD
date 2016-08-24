const SignalR = require('signalrjs');

const signalR = SignalR();

signalR.hub('controlHub', {
  switchLightOn: function(id) {
      this.clients.all.invoke('switchLightOn').withArgs(id);
      console.log(id + ' switched on');
  },
  switchLightOff: function(id) {
      this.clients.all.invoke('switchLightOff').withArgs(id);
      console.log(id + ' switched off');
  },
  switchAllLightsOn: function() {
      this.clients.all.invoke('switchAllLightsOn');
      console.log('all lights switched on');
  },
  switchAllLightsOff: function() {
      this.clients.all.invoke('switchAllLightsOff');
      console.log('all lights switched off');
  }
})

module.exports = signalR;
