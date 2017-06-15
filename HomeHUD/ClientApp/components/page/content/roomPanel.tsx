import * as _map from 'lodash/map';
import * as _filter from 'lodash/filter';
import * as _indexOf from 'lodash/indexOf';

// react
import * as React from 'react'
import * as classNames from 'classnames';

import * as LightAction from '../../../state/lights/lightActions';
import * as LightActionTypes from '../../../state/lights/lightActionTypes';

// redux
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IAppState } from '../../../state/state';

// props
import { LIGHT_SWITCH_STATE, ILightSwitchState } from '../../../state/lights/lightsState';

// components
import LightSwitch from './lightSwitch';

// style
import * as style from '../../../css/components/room-panel.css';

// component ---------------------------------------------------------------------------------

export interface IRoomPanelPublicProps {
    id: number;
    showName: boolean;
    showBulkSwitches: boolean;
}

interface IRoomPanelProps extends IRoomPanelPublicProps {
    name: string;
    onSwitchAllOn: (lights: Array<ILightSwitchState>) => void;
    onSwitchAllOff: (lights: Array<ILightSwitchState>) => void;
    lights: Array<ILightSwitchState>;
}

class RoomPanel extends React.Component<IRoomPanelProps, {}> {

    private renderLightSwitch = (entry: ILightSwitchState, index: number) => {
        return (
            <LightSwitch key={index} id={entry.id} />
        )
    }

    private renderLightSwitches = () => {
        return _map(this.props.lights, this.renderLightSwitch);
    }

    public render() {

        var nameClasses = classNames(
            style.name,
            {
                [style.hidden]: !this.props.showName
            });

        var switchesClasses = classNames(
            style.container,
            {
                [style.hidden]: !this.props.showBulkSwitches
            });

        return (
            <div>

                <div className={switchesClasses}>
                    <button className={style.button} onClick={() => this.props.onSwitchAllOn(this.props.lights)}>Switch all ON</button>
                    <button className={style.button} onClick={() => this.props.onSwitchAllOff(this.props.lights)}>Switch all OFF</button>
                </div>
                <div className={style.container}>
                    <h2 className={nameClasses}>{this.props.name}</h2>

                    {this.renderLightSwitches()}
                </div>
            </div>
        );
    }
}

// redux ---------------------------------------------------------------------------------

const mapStateToProps = (state: IAppState, publicProps: IRoomPanelPublicProps) => {
    var configEntry = _filter(state.config.rooms, (room) => { return room.id === publicProps.id })[0];
    if (!configEntry) {
        throw Error("Invalid room config, lightId " + publicProps.id + " is expected to have an entry in the config.");
    }

    return {
        name: configEntry.name,
        lights: _filter(state.lights.all, (light) => {
            return _indexOf(configEntry.lights, light.id) > -1;
        })
    };
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    onSwitchAllOn(lights: Array<ILightSwitchState>) {
        dispatch({
            type: LightActionTypes.TrySetAllLightsState,
            lightIds: _map(lights, light => light.id),
            state: LIGHT_SWITCH_STATE.ON
        } as LightAction.TrySetAllLightsStateAction)
    },
    onSwitchAllOff(lights: Array<ILightSwitchState>) {
        dispatch({
            type: LightActionTypes.TrySetAllLightsState,
            lightIds: _map(lights, light => light.id),
            state: LIGHT_SWITCH_STATE.ON
        } as LightAction.TrySetAllLightsStateAction)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomPanel);
