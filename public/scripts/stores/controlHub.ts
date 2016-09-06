import { store } from './app';

import { ILightsState } from './lights/lightsState';
import { lightActions } from './lights/lightActions';
import {
    TRY_SET_LIGHT_ON,
    TRY_SET_LIGHT_OFF,
    TRY_SET_ALL_LIGHTS_ON,
    TRY_SET_ALL_LIGHTS_OFF,
    SET_LIGHT_ON,
    SET_LIGHT_OFF,
    SET_ALL_LIGHTS_ON,
    SET_ALL_LIGHTS_OFF,
    GET_CURRENT_LIGHT_STATE,
    SET_CURRENT_LIGHT_STATE
} from './lights/lightActionDescriptions';

export interface IControlHub {
    init: () => void;
    //getCurrentLightsState: () => ILightsState;
    trySetLightOn: (id: string | number) => void;
    trySetLightOff: (id: string | number) => void;
    trySetAllLightsOn: () => void;
    trySetAllLightsOff: () => void;
}

export class ControlHub implements IControlHub {

    private connection: SignalR.Hub.Connection;
    private proxy: SignalR.Hub.Proxy;

    constructor() {
        this.init();
    }

    public init(): void {
        this.connection = jQuery.hubConnection();
        this.connection.logging = true;
        this.proxy = this.connection.createHubProxy('controlHub');

        this.setClientEventHandlers();
        this.startConnection();
            console.log('continue')
    }

    private setClientEventHandlers(): void {
        this.proxy.on(SET_LIGHT_ON, (id: SET_LIGHT_ON) => {
            store.dispatch(lightActions.SET_LIGHT_ON(id))
            console.log(id + ' switched on on client')
        })
        this.proxy.on(SET_LIGHT_OFF, (id: SET_LIGHT_OFF) => {
            store.dispatch(lightActions.SET_LIGHT_OFF(id))
            console.log(id + ' switched off on client')
        })
        this.proxy.on(SET_ALL_LIGHTS_ON, () => {
            store.dispatch(lightActions.SET_ALL_LIGHTS_ON())
            console.log('all lights switched on on client')
        })
        this.proxy.on(SET_ALL_LIGHTS_OFF, () => {
            store.dispatch(lightActions.SET_ALL_LIGHTS_ON())
            console.log('all lights switched off on client')
        })
        this.proxy.on(SET_CURRENT_LIGHT_STATE, (state: SET_CURRENT_LIGHT_STATE) => {
            store.dispatch(lightActions.SET_CURRENT_LIGHT_STATE(state))
            console.log('setting current light state on client')
        })
    }

    private startConnection(): void {
            this.connection.start()
                .done(() => {
                    this.proxy.invoke(GET_CURRENT_LIGHT_STATE);
                })
                .fail(() => {})
                .always(() => { console.log('started'); });
    }

    // private getCurrentLightsState(): ILightsState {
    //     return <ILightsState>{ all: {} };
    // }

    public trySetLightOn(id: TRY_SET_LIGHT_OFF): void {
        this.proxy.invoke(TRY_SET_LIGHT_ON, id);
    }

    public trySetLightOff(id: TRY_SET_LIGHT_OFF): void {
        this.proxy.invoke(TRY_SET_LIGHT_OFF, id);
    }

    public trySetAllLightsOn(): void {
        this.proxy.invoke(TRY_SET_ALL_LIGHTS_ON);
    }

    public trySetAllLightsOff(): void {
        this.proxy.invoke(TRY_SET_ALL_LIGHTS_OFF);
    }
}
