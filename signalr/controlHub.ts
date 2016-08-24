const signalR = require('signalrjs');
export const controlHub = signalR.hub(
  'controlHub',
{
    switchLightOn: (id : string | number) => {
        this.clients.all.invoke('switchLightOn').withArgs(id);
        console.log(id + 'switched on');
    },
    switchLightOff: (id : string | number) => {
        this.clients.all.invoke('switchLightOff').withArgs(id);
        console.log(id + 'switched off');
    },
    switchAllLightsOn: () => {
        this.clients.all.invoke('switchAllLightsOn');
        console.log('all lights switched on');
    },
    switchAllLightsOff: () => {
        this.clients.all.invoke('switchAllLightsOff');
        console.log('all lights switched off');
    }
});
