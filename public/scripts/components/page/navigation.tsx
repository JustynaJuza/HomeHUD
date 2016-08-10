import * as React from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux-actions';
import { Dispatch } from 'redux';
import * as classNames from 'classnames';
import * as _ from 'lodash';

import { NavigationTab } from './navigation-tab';
import { HomeHUD, IRoomTab } from '../homeHud';
import { NavigationActions, ACTIVATE_TAB } from '../../stores/actions/navigationActions'

import * as style from './../../../styles/navigation.css';

interface INavigationProps {
    dispatch: Dispatch<any>;
    selectedNavigationTab: number;
    onSelectTab: (id:number) => Action<ACTIVATE_TAB>;
}

interface INavigationState {
}

class Navigation extends React.Component<INavigationProps, INavigationState> {

    constructor(){
        super();
        this.createTabFromConfig = this.createTabFromConfig.bind(this);
    }

    private config = new HomeHUD();

    private createTabFromConfig(entry: IRoomTab, index: number) {
        return <NavigationTab key={index} id={index} hash={entry.hash} onSelectTab={this.props.onSelectTab}
            selectedNavigationTab={this.props.selectedNavigationTab}>
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


    function mapStateToProps(state: INavigationProps) {
    return {
        selectedNavigationTab: state.selectedNavigationTab
    }
};

    function mapDispatchToProps(dispatch : Dispatch<ACTIVATE_TAB>) {
  return {
    onSelectTab: (id: number) => dispatch(NavigationActions.ACTIVATE_TAB(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);