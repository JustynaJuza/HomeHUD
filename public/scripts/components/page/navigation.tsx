import * as React from 'react';
import * as classNames from 'classnames';

import { NavigationTab } from './navigation-tab';

import * as style from './../../../styles/navigation.css';

interface INavigationProps {
}

interface INavigationState {
}

class Navigation extends React.Component<INavigationProps, INavigationState> {

    private activateTab(id : number) {
		//this.state.isActive = true;
    }

    public render() {

        return (
            <ul className={style.list}>
            	<NavigationTab hash='#control'>Control Panel</NavigationTab>
            	<NavigationTab hash='#gaming'>Gaming room</NavigationTab>
            	<NavigationTab hash='#bed'>Bedroom</NavigationTab>
            	<NavigationTab hash='#living'>Living room</NavigationTab>
			</ul>
		);
    }
}

export { Navigation };