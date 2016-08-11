import * as React from 'react';
import * as classNames from 'classnames';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import { IAppState } from '../../../stores/app';
import { ILightSwitchState } from '../../../stores/lightsReducer';
import { homeHudConfig as config } from "../../HomeHud";

import * as style from '../../../../styles/control-panel.css';

interface IControlPanelProps {
    lights: Array<ILightSwitchState>;
    onSwitchChange: (id : number) => void;
}

export class ControlPanel extends React.Component<IControlPanelProps, {}> {

    public render() {
        console.log(this.props.lights)

        return (
            <div></div>
        );
    }
}

const mapStateToProps = (state: IAppState) => {
    return {
        lights: state.lights.all
    }
};

export default connect(mapStateToProps)(ControlPanel);