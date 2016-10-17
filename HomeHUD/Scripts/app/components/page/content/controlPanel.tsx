import * as _map from 'lodash/map';
import * as _filter from "lodash/filter";
import * as _sortBy from "lodash/sortBy";

// react
import * as React from 'react'

// redux
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IAppState } from '../../../state/app';
import { lightActions } from '../../../state/lights/lightActions';

// props
import { IRoomConfig } from '../../../state/config/configState';

// components
import LightSwitch from './lightSwitch';
import RoomPanel from './roomPanel';

// style
import * as style from '../../../../../content/component-styles/control-panel.css';

// component ---------------------------------------------------------------------------------

interface IControlPanelProps {
    dispatch: Dispatch<any>;
    rooms: IRoomConfig[];
}

export class ControlPanel extends React.Component<IControlPanelProps, {}> {
    private handlers: any;

    constructor(props: IControlPanelProps) {
        super(props);
        this.handlers = this.createHandlers(props.dispatch);
    }

    private createHandlers(dispatch: Dispatch<any>) {
        return {
            onSwitchAllOn: () => dispatch(lightActions.TRY_SET_ALL_LIGHTS_ON()),
            onSwitchAllOff: () => dispatch(lightActions.TRY_SET_ALL_LIGHTS_OFF()),
            onSwitchOn: (id: string | number) => dispatch(lightActions.TRY_SET_LIGHT_ON(id)),
            onSwitchOff: (id: string | number) => dispatch(lightActions.TRY_SET_LIGHT_OFF(id))
        }
    }

    private renderRoom = (room: IRoomConfig, index: number) => {
        return (
            <RoomPanel key={index} id={room.id} showName={true} />
        )
    }

    private renderRooms = () => {
        return _map(_sortBy(this.props.rooms, room => room.sortWeight), this.renderRoom);
    }
    
    public render() {

        return (
            <div>
                <div className={style.container}>
                    <button className={style.button} onClick={this.handlers.onSwitchAllOn}>Switch all ON</button>
                    <button className={style.button} onClick={this.handlers.onSwitchAllOff}>Switch all OFF</button>
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

export default connect(mapStateToProps)(ControlPanel);
