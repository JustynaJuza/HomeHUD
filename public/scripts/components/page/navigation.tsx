import * as React from 'react';
import { connect } from 'react-redux';
import * as classNames from 'classnames';
import * as _ from 'lodash';

import { NavigationTab } from './navigation-tab';
import { HomeHUD, IRoomTab } from '../homeHud';
import { TabAction, TabActions } from '../../stores/actions/navigationActions'

import * as style from './../../../styles/navigation.css';

interface INavigationProps {
    selectedNavigationTab: number;
}

interface INavigationState {
}

class Navigation extends React.Component<INavigationProps, INavigationState> {

    private config = new HomeHUD();

    private activateTab(id: number) {
        //this.state.isActive = true;
    }

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

const mapStateToProps = function(state: INavigationProps) {
    return {
        selectedNavigationTab: state.selectedNavigationTab
    }
};

export default connect(mapStateToProps)(Navigation);