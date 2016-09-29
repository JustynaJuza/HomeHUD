import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as _ from 'lodash';

import { homeHudConfig as config } from "../../homeHud";

import { IAppState } from '../../../state/app';
import { ILightSwitchState } from '../../../state/lights/lightsState';
import { lightActions } from '../../../state/lights/lightActions';

import { LightSwitch } from './lightSwitch';

import * as style from '../../../../../content/component-styles/room-panel.css';

interface IRoomPanelProps {
    id: number;
    name: string;
    lights: Array<ILightSwitchState>;
    onSwitchOn: (id: string | number) => void;
    onSwitchOff: (id: string | number) => void;
}

class RoomPanel extends React.Component<IRoomPanelProps, {}> {
    
    private renderLightSwitch = (entry: ILightSwitchState, index: number) => {
        return (
            <LightSwitch key={index} id={entry.id} state={entry.state}
                onSwitchOn={() => this.props.onSwitchOn(entry.id)}
                onSwitchOff={() => this.props.onSwitchOff(entry.id)}/>
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

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    onSwitchOn(id: string | number) { dispatch(lightActions.TRY_SET_LIGHT_ON(id)); },
    onSwitchOff(id: string | number) { dispatch(lightActions.TRY_SET_LIGHT_OFF(id)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomPanel);
