import { store } from '../boot-client';
import * as _ from 'lodash';
import 'signalr';

import { navigationActions } from './navigation/navigationActions';

import { ILightsState, ILightSwitchState, ILightsState as LightsState } from './lights/lightsState';
import { lightActions } from './lights/lightActions';
import {

    TRY_SET_LIGHT_STATE,
    TRY_SET_ALL_LIGHTS_STATE,

    SET_LIGHT_STATE,
    SET_ALL_LIGHTS_STATE,

    GET_CURRENT_LIGHTS_STATE,
    SET_CURRENT_LIGHTS_STATE

} from './lights/lightActionDescriptions';

export interface IControlHub {
    init: () => void;
    trySetLightState: (lightState: TRY_SET_LIGHT_STATE) => void;
    trySetAllLightsState: (allLightsState: TRY_SET_ALL_LIGHTS_STATE) => void;
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
                //this.proxy.invoke(GET_CURRENT_LIGHTS_STATE);
            })
            .fail(() => {
                store.dispatch(navigationActions.SHOW_ERROR({
                    message: 'You will not be able to switch lights on and off, a connection with the server could not be established.'
                }));
            });
    }

    public trySetLightState(lightState: TRY_SET_LIGHT_STATE): void {
        this.proxy.invoke(SET_LIGHT_STATE, lightState);
    }

    public trySetAllLightsState(allLightsState: TRY_SET_ALL_LIGHTS_STATE): void {
        this.proxy.invoke(SET_ALL_LIGHTS_STATE, allLightsState);
    }
}
