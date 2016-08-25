import * as React from 'react';
import * as classNames from 'classnames';

import { LightSwitchPosition } from '../../../stores/lightsReducer';
import * as style from '../../../../styles/light-switch.css';

interface ILightSwitchProps {
	id: string | number;
	state: LightSwitchPosition;
	onSwitchOn: (id : string | number) => void;
	onSwitchOff: (id : string | number) => void;
}

export class LightSwitch extends React.Component<ILightSwitchProps, {}> {

	private onSwitchChange(id: string | number){
		return this.props.state === 1
			? this.props.onSwitchOff(id)
			: this.props.onSwitchOn(id)
	}

    public render() {
			console.log( this.props.id,  this.props.state)
		var switchClasses = classNames({
				[style.light_switch]: true,
				[style.active]: this.props.state === 1,
				[style.switching_on]: this.props.state === 2,
				[style.switching_off]: this.props.state === 3,
			})

        return (
					<div className={switchClasses}>
			<div className={style.switcher} onClick={this.onSwitchChange.bind(this, this.props.id)}>
				<button className={style.slider}></button>
			</div>
			<span className={style.light}></span>
		</div>
		);
    }
}
