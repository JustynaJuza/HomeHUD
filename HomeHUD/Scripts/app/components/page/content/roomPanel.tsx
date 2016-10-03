import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as classNames from 'classnames';
import * as _ from 'lodash';

//import { homeHudConfig as config } from "../../homeHud";

//import { IRoomConfig } from '../../../state/config/configState';
import { IAppState } from '../../../state/app';
import { ILightSwitchState } from '../../../state/lights/lightsState';
import { lightActions } from '../../../state/lights/lightActions';

import LightSwitch from './lightSwitch';

import * as style from '../../../../../content/component-styles/room-panel.css';

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
        return _.map(this.props.lights, this.renderLightSwitch);
    }

    public render() {

        var panelClasses = classNames({
            [style.hidden]: !this.props.showName,
        })

        return (
            <div className={style.switches}>
                <h2 className={panelClasses}>{this.props.name}</h2>

                { this.renderLightSwitches() }
            </div>
        );
    }
}

const mapStateToProps = (state: IAppState, publicProps: IRoomPanelPublicProps) => {
    var configEntry = _.filter(state.config.rooms, (room) => { return room.id === publicProps.id })[0];
    if (!configEntry) {
        throw Error("Invalid room config, lightId " + publicProps.id + " is expected to have an entry in the config.");
    }

    return {
        name: configEntry.name,
        lights: _.filter(state.lights.all, (light) => {
            return _.indexOf(configEntry.lights, light.id) > -1;
        })
    };
}

export default connect(mapStateToProps)(RoomPanel);
