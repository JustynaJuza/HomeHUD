import { store } from '../stores/app';
import {
    LightActions,
    SET_LIGHT_ON,
    SET_LIGHT_OFF,
    SET_ALL_LIGHTS_ON,
    SET_ALL_LIGHTS_OFF
} from '../stores/actions/lightActions';

interface IControlHub {
  connected:boolean;
  init: () => void;
  switchLightOn: (id: string|number) => void;
  switchLightOff: (id: string|number) => void;
  switchAllLightsOn: () => void;
  switchAllLightsOff: () => void;
}

export class ControlHub implements IControlHub {

    private connection: SignalR.Hub.Connection;
    private proxy: SignalR.Hub.Proxy;

    connected = false;

    public init() : void {
        this.connection = jQuery.hubConnection();
        this.connection.logging = true;
        this.proxy = this.connection.createHubProxy('controlHub');

        this.setClientEventHandlers();
        this.startConnection();
    }

    private setClientEventHandlers() : void {
      this.proxy.on('switchLightOn', (id: string | number) => {
        store.dispatch(LightActions.SET_LIGHT_ON(id))
        console.log(id + ' switched on on client')
      })
      this.proxy.on('switchLightOff', (id: string | number) => {
        store.dispatch(LightActions.SET_LIGHT_OFF(id))
        console.log(id + ' switched off on client')
      })
      this.proxy.on('switchAllLightsOn', () => {
        store.dispatch(LightActions.SET_ALL_LIGHTS_ON())
        console.log('all lights switched on on client')
      })
      this.proxy.on('switchAllLightsOff', () => {
        store.dispatch(LightActions.SET_ALL_LIGHTS_ON())
        console.log('all lights switched off on client')
      })
    }

    private startConnection(): void {
      this.connection.start()
        .done(() => {
            this.proxy.invoke('switchLightOn', '234').done(() => { console.log('sent'); });
        })
    }

    public switchLightOn(id: string|number): void {
          this.proxy.invoke('switchLightOn', id).done(() => { console.log('sent'); });
    }

    public switchLightOff(id: string|number): void {
        this.proxy.invoke('switchLightOff', id).done(() => { console.log('sent'); });
    }

    public switchAllLightsOn() : void {
        this.proxy.invoke('switchAllLightsOn').done(() => { console.log('sent'); });
    }

    public switchAllLightsOff() : void {
        this.proxy.invoke('switchAllLightsOff').done(() => { console.log('sent'); });
    }
}
