import * as React from 'react';
import * as classNames from 'classnames';

import * as style from '../../../../styles/light-switch.css';

interface ILightSwitchProps {
	id: string | number;
	isActive: boolean;
	onSwitchOn: (id : string | number) => void;
	onSwitchOff: (id : string | number) => void;
}

export class LightSwitch extends React.Component<ILightSwitchProps, {}> {

	private onSwitchChange(id: string | number){
		return this.props.isActive
			? this.props.onSwitchOff(id)
			: this.props.onSwitchOn(id)
	}

    public render() {
		var switchClasses = classNames({
				[style.switcher]: true,
				[style.active]: this.props.isActive
			})

        return (
			<button className={switchClasses} onClick={this.onSwitchChange.bind(this, this.props.id)}>			
			</button>
		);
    }
}