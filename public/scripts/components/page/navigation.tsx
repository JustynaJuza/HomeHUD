import * as React from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux-actions';
import { Dispatch } from 'redux';
import * as classNames from 'classnames';
import * as _ from 'lodash';

import { IAppState } from '../../stores/app';

import { NavigationTab } from './navigation-tab';
import { HomeHUD, IRoomTab } from '../homeHud';
import { NavigationActions, SELECT_NAVIGATION_TAB } from '../../stores/actions/navigationActions'

import * as style from '../../../styles/navigation.css';

interface INavigationProps {
    dispatch: Dispatch<any>;
    selectedNavigationTab: number;
}

interface INavigationState {
}

class Navigation extends React.Component<INavigationProps, INavigationState> {

    private handlers : any;

    constructor(props : INavigationProps){
        super(props);
        this.handlers = this.createHandlers(this.props.dispatch);
        this.createTabFromConfig = this.createTabFromConfig.bind(this);
    }

    private createHandlers(dispatch : Dispatch<any>){
        return {
            onSelectTab: (id: number) => dispatch(NavigationActions.SELECT_NAVIGATION_TAB(id))
        }
    }


    private config = new HomeHUD();

    private createTabFromConfig(entry: IRoomTab, index: number) {
        return <NavigationTab key={index} id={index} hash={entry.hash} onSelectTab={this.handlers.onSelectTab}
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


const mapStateToProps = (state: IAppState) => {
    return {
        selectedNavigationTab: state.navigation.selectedNavigationTab
    }
};

export default connect(mapStateToProps)(Navigation);