import { Reducer } from 'redux';
import * as _map from 'lodash/map';
import * as _indexOf from 'lodash/indexOf';

import * as LightActions from './lightActions';
import * as LightActionTypes from './lightActionTypes';

import { ILightsState, ILightSwitchState, lightSwitchState } from './lightsState';

import { IControlHub, ControlHub } from '../controlHub';

export interface ILightsReducer {
    get: () => Reducer<ILightsState>;
}

export class LightsReducer implements ILightsReducer {
    // due to some import issues, hub needs to be set externally
    // so reducer can work both in server and client rendering mode
    public hub: IControlHub

    private initialLightsState: ILightsState = {
        all: []
    }

    private getDesiredTargetState(switchingState: number) {
        switch (switchingState) {
            case lightSwitchState.switchingOn:
            case lightSwitchState.on:
                return lightSwitchState.on;
            default:
                return lightSwitchState.off;
        }
    }

    private reducer: Reducer<ILightsState> = (state: ILightsState, action: LightActions.LightAction) => {
        switch (action.type) {

            case LightActionTypes.SetAllLights:
                return (<LightActions.SetAllLightsAction>action).lights;

            case LightActionTypes.TrySetLightState:
                this.hub.trySetLightState({
                    lightId: (<LightActions.TrySetLightStateAction>action).lightId,
                    state: (<LightActions.TrySetLightStateAction>action).state
                });
                return state;

            case LightActionTypes.TrySetAllLightsState:
                this.hub.trySetAllLightsState({
                    lightIds: (<LightActions.TrySetAllLightsStateAction>action).lightIds,
                    state: (<LightActions.TrySetAllLightsStateAction>action).state
                });
                return state;

            case LightActionTypes.SetLightState:
                var needsSwitching: boolean;
                var desiredState = this.getDesiredTargetState((<LightActions.SetLightStateAction>action).state);

                return Object.assign({}, state, {
                    all: _map(state.all, (light: ILightSwitchState) => {

                        needsSwitching =
                            light.id === (<LightActions.SetLightStateAction>action).lightId
                            && light.state !== desiredState;

                        if (needsSwitching) {
                            light.state = (<LightActions.SetLightStateAction>action).state;
                        }

                        return light;
                    })
                });

            case LightActionTypes.SetAllLightsState:
                var switchAllLights = !(<LightActions.SetAllLightsStateAction>action).lightIds.length;
                var desiredState = this.getDesiredTargetState((<LightActions.SetAllLightsStateAction>action).state);

                return Object.assign({}, state,
                    {
                        all: _map(state.all, (light: ILightSwitchState) => {

                            if (switchAllLights && light.state !== desiredState) {
                                light.state = (<LightActions.SetAllLightsStateAction>action).state;
                            }
                            else {
                                needsSwitching =
                                    _indexOf((<LightActions.SetAllLightsStateAction>action).lightIds, light.id) > -1
                                    && light.state !== desiredState;

                                if (needsSwitching) {
                                    light.state = (<LightActions.SetAllLightsStateAction>action).state;
                                }
                            }

                            return light;
                        })
                    });

            default:
                return state || this.initialLightsState;
                //throw new RangeError(
                //    `The action type ${ action.type } passed to ${ 'Reducer<ILightsState>' } is not recognized and has no state transitions defined.`);
        }
    };

    public get(): Reducer<ILightsState> {
        return this.reducer;
    }
}