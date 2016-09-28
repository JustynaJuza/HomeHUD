import { store } from './app';
import * as _ from 'lodash';

import { ILightsState, ILightSwitchState, ILightsState as LightsState } from './lights/lightsState';
import { lightActions } from './lights/lightActions';
import {
    SET_LIGHT_STATE,
    TRY_SET_LIGHT_ON,
    TRY_SET_LIGHT_OFF,
    TRY_SET_ALL_LIGHTS_ON,
    TRY_SET_ALL_LIGHTS_OFF,
    SET_LIGHT_ON,
    SET_LIGHT_OFF,
    SET_ALL_LIGHTS_ON,
    SET_ALL_LIGHTS_OFF,
    GET_CURRENT_LIGHTS_STATE,
    SET_CURRENT_LIGHTS_STATE
} from './lights/lightActionDescriptions';

export interface IControlHub {
    init: () => void;
    //getCurrentLightsState: () => ILightsState;
    setLightOn: (id: string | number) => void;
    setLightOff: (id: string | number) => void;
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

        this.proxy.on('SetLightState', (data: SET_LIGHT_STATE) => {
            store.dispatch(lightActions.SET_LIGHT_STATE(data));
            console.log('switching' + data.lightId + 'to ' + data.state + ' on client');
        }),
            this.proxy.on(SET_LIGHT_ON, (id: SET_LIGHT_ON) => {
                store.dispatch(lightActions.SET_LIGHT_ON(id));
                console.log(id + ' switched on on client');
            }),
            this.proxy.on(SET_LIGHT_OFF, (id: SET_LIGHT_OFF) => {
                store.dispatch(lightActions.SET_LIGHT_OFF(id));
                console.log(id + ' switched off on client');
            }),
            this.proxy.on(SET_ALL_LIGHTS_ON, () => {
                store.dispatch(lightActions.SET_ALL_LIGHTS_ON());
                console.log('all lights switched on on client');
            }),
            this.proxy.on(SET_ALL_LIGHTS_OFF, () => {
                store.dispatch(lightActions.SET_ALL_LIGHTS_OFF());
                console.log('all lights switched off on client');
            }),
            this.proxy.on(SET_CURRENT_LIGHTS_STATE, (state: LightsState) => {

            //var state = <ILightsState>{ all: [] };
//            _.forEach(lights,
//                (light) => {
//                    var map : ILightSwitchState;
//                    var keys = Object.keys(light);
//                    _.forEach(keys, (key: string) => {
//                        var z = key.charAt(0).toLowerCase() + key.slice(1);
//                        map[z] = light[key];
//                    });
//
//
//                        _.transform(light,
//                            (l: ILightSwitchState, value: any, key: string) => { l[key.toLowerCase()] = value })
//                        state.all.push(x);
//                    });

                

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

    public setLightOn(id: SET_LIGHT_ON): void {
        this.proxy.invoke('SetLightOn', id);
    }

    public setLightOff(id: SET_LIGHT_ON): void {
        this.proxy.invoke('SetLightOff', id);
    }

    public setAllLightsOn(): void {
        this.proxy.invoke('SetAllLightsOn');
    }

    public setAllLightsOff(): void {
        this.proxy.invoke('SetAllLightsOff');
    }
}
