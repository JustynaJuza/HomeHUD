import * as _map from 'lodash/map';
import * as _filter from "lodash/filter";
import * as _sortBy from "lodash/sortBy";

// react
import * as React from 'react'

// redux
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IAppState } from '../../../state/state';

import * as LightAction from '../../../state/lights/lightActions';
import * as LightActionTypes from '../../../state/lights/lightActionTypes';

// props
import { IRoomConfig } from '../../../state/config/configState';
import { LIGHT_SWITCH_STATE } from '../../../state/lights/lightsState';

// components
import LightSwitch from './lightSwitch';
import RoomPanel from './roomPanel';

// style
import * as style from '../../../css/components/control-panel.css';

import { Route } from 'react-router';

// component ---------------------------------------------------------------------------------

interface IControlPanelProps {
    dispatch: Dispatch<any>;
    rooms: IRoomConfig[];
    onSwitchAllOn: () => void;
    onSwitchAllOff: () => void;
}

class ControlPanel extends React.Component<IControlPanelProps, {}> {

    private renderRoom = (room: IRoomConfig, index: number) => {
        return (
            <RoomPanel key={index} id={room.id} showName={true} showBulkSwitches={false} />
        )
    }

    private renderRooms = () => {
        return _map(_sortBy(this.props.rooms, room => room.sortWeight), this.renderRoom);
    }

    private renderPath = (room: IRoomConfig, index: number) => {
        return (
            <Route key={index} path={room.hash} />
        )
    }

    private renderPaths = () => {
        return _map(_sortBy(this.props.rooms, room => room.sortWeight), this.renderPath);
    }


    public render() {
        return (
            <div>
                <div className={style.container}>
                    <button className={style.button} onClick={() => this.props.onSwitchAllOn()}>Switch all ON</button>
                    <button className={style.button} onClick={() => this.props.onSwitchAllOff()}>Switch all OFF</button>
                </div>

                {this.renderRooms()}

            </div>
        );
    }
}

// redux ---------------------------------------------------------------------------------

const mapStateToProps = (state: IAppState) => {
    return {
        rooms: _filter(state.config.rooms, (room) => room.lights.length > 0)
    }
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    onSwitchAllOn() {
        dispatch({
            type: LightActionTypes.TrySetAllLightsState,
            lightIds: [],
            state: LIGHT_SWITCH_STATE.ON
        } as LightAction.TrySetAllLightsStateAction)
    },
    onSwitchAllOff() {
        dispatch({
            type: LightActionTypes.TrySetAllLightsState,
            lightIds: [],
            state: LIGHT_SWITCH_STATE.OFF
        } as LightAction.TrySetAllLightsStateAction)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
