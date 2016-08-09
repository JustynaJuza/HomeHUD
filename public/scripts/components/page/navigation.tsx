import * as React from 'react';
import * as classNames from 'classnames';
import * as _ from 'lodash';

import { NavigationTab } from './navigation-tab';
import { HomeHUD, IRoomTab } from '../homeHud';

import * as style from './../../../styles/navigation.css';

interface INavigationProps {
}

interface INavigationState {
}

class Navigation extends React.Component<INavigationProps, INavigationState> {

    private activateTab(id : number) {
		//this.state.isActive = true;
    private config = new HomeHUD();


    private createTabFromConfig(entry: IRoomTab, index: number) {
        return <NavigationTab 
        key={index} 
        hash={entry.hash}
        onSelectTab={TabActions[TabAction.ACTIVATE_TAB]}>
        {entry.name}
        </NavigationTab>
    }

    public render() {
        const navigationTabs = _.chain(this.config.rooms)
            .sortBy((entry) => { return entry.index; })
            .map(this.createTabFromConfig)
            .value();

        return (
            <ul className={style.list}>
                { navigationTabs }
            </ul>
        );
    }
}

export { Navigation };