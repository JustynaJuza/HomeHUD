import * as _map from 'lodash/map';
import * as _groupBy from 'lodash/groupBy';

// react
import * as React from 'react'

// redux
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IAppState } from '../../../state/app';
import { lightActions } from '../../../state/lights/lightActions';

// props
import { ILightSwitchState } from '../../../state/lights/lightsState';

// components
import LightSwitch from './lightSwitch';
import RoomPanel from './roomPanel';

// style
import * as style from '../../../../../content/component-styles/control-panel.css';

// component ---------------------------------------------------------------------------------

interface IControlPanelProps {
    dispatch: Dispatch<any>;
    lights: Array<ILightSwitchState>;
    onSwitchChange: (id: number) => void;
}

export class ControlPanel extends React.Component<IControlPanelProps, {}> {
    private handlers: any;

    constructor(props: IControlPanelProps) {
        super(props);
        this.handlers = this.createHandlers(this.props.dispatch);
    }

    private createHandlers(dispatch: Dispatch<any>) {
        return {
            onSwitchAllOn: () => dispatch(lightActions.TRY_SET_ALL_LIGHTS_ON()),
            onSwitchAllOff: () => dispatch(lightActions.TRY_SET_ALL_LIGHTS_OFF()),
            onSwitchOn: (id: string | number) => dispatch(lightActions.TRY_SET_LIGHT_ON(id)),
            onSwitchOff: (id: string | number) => dispatch(lightActions.TRY_SET_LIGHT_OFF(id))
        }
    }

    private renderRooms = () => {
        var groupedByRoom = _groupBy(this.props.lights, (entry: ILightSwitchState) => entry.roomId);
        _map([1, 2, 3], this.renderRoom)
    }


    private renderRoom = (entry: ILightSwitchState, index: number) => {
        return (
            <RoomPanel key={index} showName={true} id={0} />
        )
    }

    public render() {

        return (
            <div className={style.switches}>
                <button onClick={this.handlers.onSwitchAllOn}>Switch all ON</button>
                <button onClick={this.handlers.onSwitchAllOff}>Switch all OFF</button>

                { this.renderRooms() }
            </div>
        );
    }
}

// redux ---------------------------------------------------------------------------------

const mapStateToProps = (state: IAppState) => {
    return {
        lights: state.lights.all
    }
};

export default connect(mapStateToProps)(ControlPanel);
