import * as _map from 'lodash/map';
import * as _filter from "lodash/filter";
import * as _sortBy from "lodash/sortBy";

// react
import * as React from 'react'

// redux
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IAppState } from '../../../state/store';
import { lightActions } from '../../../state/lights/lightActions';

// props
import { IRoomConfig } from '../../../state/config/configState';
import { LIGHT_SWITCH_STATE } from '../../../state/lights/lightsState';

// components
import LightSwitch from './lightSwitch';
import RoomPanel from './roomPanel';

// style
import * as style from '../../../css/components/control-panel.css';

// component ---------------------------------------------------------------------------------

interface IControlPanelProps {
    dispatch: Dispatch<any>;
    rooms: IRoomConfig[];
    onSwitchAllOn: () => void;
    onSwitchAllOff: () => void;
}

export class ControlPanel extends React.Component<IControlPanelProps, {}> {
    
    private renderRoom = (room: IRoomConfig, index: number) => {
        return (
            <RoomPanel key={index} id={room.id} showName={true} showBulkSwitches={false}/>
        )
    }

    private renderRooms = () => {
        return _map(_sortBy(this.props.rooms, room => room.sortWeight), this.renderRoom);
    }
    
    public render() {

        return (
            <div>
                <div className={style.container}>
                    <button className={style.button} onClick={() => this.props.onSwitchAllOn()}>Switch all ON</button>
                    <button className={style.button} onClick={() => this.props.onSwitchAllOff()}>Switch all OFF</button>
                </div>

            { this.renderRooms() }

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
        dispatch(lightActions.TRY_SET_ALL_LIGHTS_STATE({ lightIds: [], state: LIGHT_SWITCH_STATE.ON }));
    },
    onSwitchAllOff() {
        dispatch(lightActions.TRY_SET_ALL_LIGHTS_STATE({ lightIds: [], state: LIGHT_SWITCH_STATE.OFF }));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
