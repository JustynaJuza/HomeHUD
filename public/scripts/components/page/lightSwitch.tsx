import * as React from 'react';
import * as classNames from 'classnames';

import * as style from '../../../styles/light-switche.css';

interface ILightSwitchProps {
	key: number;
	isActive: boolean;
	onSwitchChange: (id : number) => void;
}

class LightSwitch extends React.Component<ILightSwitchProps, {}> {

    public render() {
		var switchClasses = classNames({
				[style.switch]: true,
				[style.active]: this.props.isActive
			})

        return (
			<button className={switchClasses} onClick={this.props.onSwitchChange.bind(this, this.props.id)}>			
			</button>
		);
    }
}

export { LightSwitch };