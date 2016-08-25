import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as _ from 'lodash';

import { IAppState } from '../../../stores/app';
import { ILightSwitchState } from '../../../stores/lightsReducer';
import { homeHudConfig as config } from "../../HomeHud";
import {
    LightActions,
    SWITCH_LIGHT_ON,
    SWITCH_LIGHT_OFF,
    SWITCH_ALL_LIGHTS_ON,
    SWITCH_ALL_LIGHTS_OFF
} from '../../../stores/actions/lightActions';

import { LightSwitch } from './lightSwitch';

import * as style from '../../../../styles/room-panel.css';

interface IRoomPanelProps {
    dispatch: Dispatch<any>;
    id: number;
    lights: Array<ILightSwitchState>;
    onSwitchChange: (id : number) => void;
}

class RoomPanel extends React.Component<IRoomPanelProps, {}> {

    private handlers : any;

    constructor(props : IRoomPanelProps){
        super(props);
        this.handlers = this.createHandlers(this.props.dispatch);
    }

    private createHandlers(dispatch : Dispatch<any>){
        return {
            onSwitchOn: (id: string | number) => dispatch(LightActions.SWITCH_LIGHT_ON(id)),
            onSwitchOff: (id: string | number) => dispatch(LightActions.SWITCH_LIGHT_OFF(id))
        }
    }
    private renderLightSwitch = (entry: ILightSwitchState, index: number) => {
        return (
            <LightSwitch key={index} id={entry.id} state={entry.state}
            onSwitchOn={this.handlers.onSwitchOn}
            onSwitchOff={this.handlers.onSwitchOff}/>
        )
    }

    private renderLightSwitches = () => {
        return _.map(this.props.lights, this.renderLightSwitch);
    }

    public render() {

        return (
            <div className={style.switches}>
                { this.renderLightSwitches() }
            </div>
        );
    }
}

const mapStateToProps = (state: IAppState) => {
    return {
        lights: _.intersectionBy(
            state.lights.all,
            config.getRoomLights(state.navigation.selectedNavigationTab),
            'id')
    }
};

export default connect(mapStateToProps)(RoomPanel);
