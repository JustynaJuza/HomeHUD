import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as _ from 'lodash';

import { IAppState } from '../../stores/app';
import { homeHudConfig as config, IControlPanelTab } from '../homeHud';

import { NavigationTab } from './navigation-tab';
import { NavigationActions, SELECT_NAVIGATION_TAB } from '../../stores/actions/navigationActions';

import * as style from '../../../styles/navigation.css';

interface INavigationProps {
    dispatch: Dispatch<any>;
    selectedNavigationTab: number;
}

class Navigation extends React.Component<INavigationProps, {}> {

    private handlers : any;

    constructor(props : INavigationProps){
        super(props);
        this.handlers = this.createHandlers(this.props.dispatch);
    }

    private createHandlers(dispatch : Dispatch<any>){
        return {
            onSelectTab: (id: number) => dispatch(NavigationActions.SELECT_NAVIGATION_TAB(id))
        }
    }

    private renderNavigationTab = (entry: IControlPanelTab, index: number) => {

        var isActive = this.props.selectedNavigationTab === index;

        return (
            <NavigationTab key={index} id={index} isActive={isActive} hash={entry.hash} onSelectTab={this.handlers.onSelectTab}>
                {entry.name}
            </NavigationTab>
        )
    }

    private renderNavigationTabs = () => {
        return _(config.getRooms())
               .map(this.renderNavigationTab)
               .sortBy((entry: IControlPanelTab) => entry.index)
               .value();
    }

    public render() {
        return (
            <ul className={style.list}>
                { this.renderNavigationTabs() }
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