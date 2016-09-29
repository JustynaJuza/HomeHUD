import { store } from './app';
import * as _ from 'lodash';

import { ILightsState, ILightSwitchState, ILightsState as LightsState } from './lights/lightsState';
import { lightActions } from './lights/lightActions';
import {
    SET_LIGHT_STATE,
    SET_ALL_LIGHTS_STATE,
    GET_CURRENT_LIGHTS_STATE,
    SET_CURRENT_LIGHTS_STATE,

    SET_LIGHT
} from './lights/lightActionDescriptions';

export interface IControlHub {
    init: () => void;
    setLightOn: (id: SET_LIGHT) => void;
    setLightOff: (id: SET_LIGHT) => void;
    setAllLightsOn: () => void;
    setAllLightsOff: () => void;
}

export class ControlHub implements IControlHub {

    private connection: SignalR.Hub.Connection;
    private proxy: SignalR.Hub.Proxy;

    public init(): void {
        this.connection = jQuery.hubConnection();
        this.connection.logging = true;
        this.proxy = this.connection.createHubProxy('controlHub');

        this.setClientEventHandlers();
        this.startConnection();
    }

    private setClientEventHandlers(): void {

        this.proxy.on(SET_LIGHT_STATE, (data: SET_LIGHT_STATE) => {
            store.dispatch(lightActions.SET_LIGHT_STATE(data));
            console.log('switching' + data.lightId + 'to ' + data.state + ' on client');
        }),
        this.proxy.on(SET_ALL_LIGHTS_STATE, (id: SET_ALL_LIGHTS_STATE) => {
            store.dispatch(lightActions.SET_ALL_LIGHTS_STATE(id));
            console.log(id + ' switched off on client');
        }),
        this.proxy.on(SET_CURRENT_LIGHTS_STATE, (state: LightsState) => {
            console.log(state);
            store.dispatch(lightActions.SET_CURRENT_LIGHTS_STATE(state));
            console.log('setting current light state on client');
        });
    }

    private startConnection(): void {
        this.connection.start()
            .done(() => {
                this.proxy.invoke(GET_CURRENT_LIGHTS_STATE);
            })
            .fail(() => { })
            .always(() => { console.log('started'); });
    }

    public setLightOn(id: SET_LIGHT): void {
        this.proxy.invoke('SetLightOn', id);
    }

    public setLightOff(id: SET_LIGHT): void {
        this.proxy.invoke('SetLightOff', id);
    }

    public setAllLightsOn(): void {
        this.proxy.invoke('SetAllLightsOn');
    }

    public setAllLightsOff(): void {
        this.proxy.invoke('SetAllLightsOff');
    }
}
