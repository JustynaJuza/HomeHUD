import * as React from 'react'
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as classNames from 'classnames';

//import { homeHudConfig as config } from "../../homeHud";

import { IAppState } from '../../../state/app';
import { ILightSwitchState } from '../../../state/lights/lightsState';
import { lightActions } from '../../../state/lights/lightActions';

import { LightSwitchPosition } from '../../../state/lights/lightsState';
import * as style from '../../../../../content/component-styles/light-switch.css';

interface ILightSwitchPublicProps {
    id: string | number;
}

interface ILightSwitchProps extends ILightSwitchPublicProps {
    state: LightSwitchPosition;
    onSwitchOn: (id: string | number) => void;
    onSwitchOff: (id: string | number) => void;
}

class LightSwitch extends React.Component<ILightSwitchProps, {}> {

    private onSwitchChange() {
        return this.props.state === 1
            ? this.props.onSwitchOff(this.props.id)
            : this.props.onSwitchOn(this.props.id)
    }

    public render() {
        console.log(this.props.id, this.props.state)
        var lightClasses = classNames({
            [style.light]: true,
            [style.off]: this.props.state === 0,
            [style.on]: this.props.state === 1,
            [style.switching_on]: this.props.state === 2,
            [style.switching_off]: this.props.state === 3,
        })

        return (
            <div className={lightClasses}>

                <div className={style.light_switcher}
                    onClick={this.onSwitchChange.bind(this)}>

                    <button className={style.switcher}></button>

                </div>

                <span className={style.icon}></span>
            </div>
        );
    }
}

const mapStateToProps = (appState: IAppState, publicProps: ILightSwitchPublicProps) => {

    var light = appState.lights.all
        .filter((light) => { return light.id === publicProps.id })[0];

    if (!light) {
        throw Error("Invalid lights config, lightId " + publicProps.id + " is expected to have an entry in the config.");
    }

    return {
        state: light.state
    }
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    onSwitchOn(id: string | number) { dispatch(lightActions.TRY_SET_LIGHT_ON(id)); },
    onSwitchOff(id: string | number) { dispatch(lightActions.TRY_SET_LIGHT_OFF(id)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(LightSwitch);
