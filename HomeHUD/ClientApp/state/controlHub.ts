import { store } from '../boot-client';
import * as _ from 'lodash';
import 'signalr';
declare var $: any;

import * as LightAction from './lights/lightActions';
import * as LightActionTypes from './lights/lightActionTypes';

//import { navigationActions } from './navigation/navigationActions';

import { ILightsState, ILightSwitchState } from './lights/lightsState';

export interface IControlHub {
    init: () => void;
    trySetLightState: (lightState: { lightId: string | number, state: number }) => void;
    trySetAllLightsState: (allLightsState: { lightIds: Array<string | number>, state: number }) => void;
}

export class ControlHub implements IControlHub {

    private connection: SignalR.Hub.Connection;
    private proxy: SignalR.Hub.Proxy;
    private connectionStart: JQueryPromise<any>;

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
        });

        this.proxy.on('SetAllLightsState', (data: { lightIds: Array<string | number>, state: number }) => {

            store.dispatch(<LightAction.SetAllLightsStateAction>{
                type: LightActionTypes.SetAllLightsState,
                lightIds: data.lightIds,
                state: data.state
            })
        });

        this.proxy.on('SetLights', (data: ILightSwitchState[]) => {

            store.dispatch(<LightAction.SetAllLightsAction>{
                type: LightActionTypes.SetAllLights,
                lights: { all: data }
            })
        });
    }

    private startConnection(): void {
        this.connectionStart = this.connection.start();
            //.fail(() => {
            //    //store.dispatch(navigationActions.SHOW_ERROR({
            //    //    message: 'You will not be able to switch lights on and off, a connection with the server could not be established.'
            //    //}));
            //});
    }

    public trySetLightState(lightState: { lightId: string | number, state: number }): void {
        this.connectionStart.done(() => this.proxy.invoke('SetLightState', lightState));
    }

    public trySetAllLightsState(allLightsState: { lightIds: Array<string | number>, state: number }): void {
        this.connectionStart.done(() => this.proxy.invoke('SetAllLightsState', allLightsState));
    }
}
