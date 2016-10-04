import * as _map from 'lodash/map';
import * as _filter from 'lodash/filter';
import * as _indexOf from 'lodash/indexOf';

// react
import * as React from 'react'
import * as classNames from 'classnames';

// redux
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IAppState } from '../../../state/app';
import { lightActions } from '../../../state/lights/lightActions';

// props
import { ILightSwitchState } from '../../../state/lights/lightsState';

// components
import LightSwitch from './lightSwitch';

// style
import * as style from '../../../../../content/component-styles/room-panel.css';

// component ---------------------------------------------------------------------------------

export interface IRoomPanelPublicProps {
    id: number;
    showName: boolean;
}

interface IRoomPanelProps extends IRoomPanelPublicProps {
    name: string;
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
        
        var panelClasses = classNames(
            style.name,
            {
                [style.hidden]: !this.props.showName
            });

        return (
            <div className={style.switches}>
                <h2 className={panelClasses}>{this.props.name}</h2>

                { this.renderLightSwitches() }
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

export default connect(mapStateToProps)(RoomPanel);
