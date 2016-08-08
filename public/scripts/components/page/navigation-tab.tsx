import * as React from 'react';
import * as classNames from 'classnames';

import * as style from './../../../styles/navigation-tab.css';

interface INavigationTabProps {
	hash: string;
}

interface INavigationTabState {
	isActive: boolean;
}

class NavigationTab extends React.Component<INavigationTabProps, INavigationTabState> {
	// public static defaultProps: INavigationTabProps = {
 //        isActive: false,
 //        hash: ''
 //    };

	constructor() {
		super();

		this.state = {
            isActive: false
        }

    	this.activateTab = this.activateTab.bind(this);
    }

    //activateTab = () => {    	
    private activateTab () {
		this.setState({ isActive : !this.state.isActive });
    }

    public render() {
		var tabClasses = classNames(
			style.tab,
			{
				[style.active]: this.state.isActive
			})

        return (
			<li className={tabClasses}>
				<a href={`#/${this.props.hash}`} onClick={this.activateTab} className={style.link}>
					{this.props.children}
				</a>
			</li>
		);
    }
}

export { NavigationTab };