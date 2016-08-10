import * as React from 'react';
import * as classNames from 'classnames';

import * as style from '../../../styles/navigation-tab.css';

interface INavigationTabProps {
	id: number;
	selectedNavigationTab: number;
	onSelectTab: (id : number) => void;
	hash: string;
}

class NavigationTab extends React.Component<INavigationTabProps, {}> {

	constructor() {
		super();
    }

    private isActive(){
    	return this.props.selectedNavigationTab === this.props.id;
    }

    public render() {
		var tabClasses = classNames(
			style.tab,
			{
				[style.active]: this.isActive()
			})

        return (
			<li className={tabClasses}>
				<a href={`#/${this.props.hash}`} onClick={this.props.onSelectTab.bind(this, this.props.id)} className={style.link}>
					{this.props.children}
				</a>
			</li>
		);
    }
}

export { NavigationTab };