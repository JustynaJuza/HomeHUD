import { store } from './app';
import * as _ from 'lodash';

import { navigationActions } from './navigation/navigationActions';

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
        this.connection = $.hubConnection();
        this.connection.logging = true;
        this.proxy = this.connection.createHubProxy('controlHub');

        this.setClientEventHandlers();
        this.startConnection();
    }

    private setClientEventHandlers(): void {

        this.proxy.on(SET_LIGHT_STATE, (data: SET_LIGHT_STATE) => {
            store.dispatch(lightActions.SET_LIGHT_STATE(data));
        }),
        this.proxy.on(SET_ALL_LIGHTS_STATE, (data: SET_ALL_LIGHTS_STATE) => {
            store.dispatch(lightActions.SET_ALL_LIGHTS_STATE(data));
        }),
        this.proxy.on(SET_CURRENT_LIGHTS_STATE, (data: LightsState) => {
            store.dispatch(lightActions.SET_CURRENT_LIGHTS_STATE(data));
        });
    }

    private startConnection(): void {
        this.connection.start()
            .done(() => {
                this.proxy.invoke(GET_CURRENT_LIGHTS_STATE);
            })
            .fail(() => {
                store.dispatch(navigationActions.SHOW_ERROR(
                    'You will not be able to switch lights on and off, a connection with the server could not be established.'
                ));
            });
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
