import * as React from 'react';
import * as classNames from 'classnames';

import { LightSwitchPosition } from '../../../state/lights/lightsState';
import * as style from '../../../../../content/component-styles/light-switch.css';

interface ILightSwitchProps {
    id: string | number;
    state: LightSwitchPosition;
    onSwitchOn: (id : string | number) => void;
    onSwitchOff: (id : string | number) => void;
}

export class LightSwitch extends React.Component<ILightSwitchProps, {}> {
    
    public render() {
            console.log( this.props.id,  this.props.state)
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
                    onClick={this.props.state === 1
                        ? this.props.onSwitchOff
                        : this.props.onSwitchOn}>

                    <button className={style.switcher}></button>

                </div>

            <span className={style.icon}></span>
        </div>
        );
    }
}
