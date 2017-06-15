import { store } from '../boot-client';
import * as _ from 'lodash';
import 'signalr';

import * as LightAction from './lights/lightActions';
import * as LightActionTypes from './lights/lightActionTypes';

import { navigationActions } from './navigation/navigationActions';

import { ILightsState, ILightSwitchState, ILightsState as LightsState } from './lights/lightsState';
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

        this.proxy.on('SetLightState', (data: { lightId: number | string, state: number }) => {

            store.dispatch(<LightAction.SetLightStateAction>{
                type: LightActionTypes.SetLightState,
                lightId: data.lightId,
                state: data.state
            })
        }),

        this.proxy.on('SetAllLightsState', (data: { lightIds: Array<string | number>, state: number }) => {

            store.dispatch(<LightAction.SetAllLightsStateAction>{
                type: LightActionTypes.SetLightState,
                lightIds: data.lightIds,
                state: data.state
            })
            })

        //this.proxy.on(SET_CURRENT_LIGHTS_STATE, (data: LightsState) => {
        //    store.dispatch(lightActions.SET_CURRENT_LIGHTS_STATE(data));
        //});
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
        this.proxy.invoke('SetLightState', lightState);
    }

    public trySetAllLightsState(allLightsState: TRY_SET_ALL_LIGHTS_STATE): void {
        this.proxy.invoke('SetAllLightsState', allLightsState);
    }
}
