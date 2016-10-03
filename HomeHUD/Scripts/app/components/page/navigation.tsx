import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as _ from 'lodash';

//import { homeHudConfig as config, IControlPanelTab } from '../homeHud';

import { IAppState } from '../../state/app';
import { NavigationActions, SELECT_NAVIGATION_TAB } from '../../state/navigation/navigationActions';
import { NavigationTab } from './navigation-tab';

import * as style from '../../../../content/component-styles/navigation.css';

interface IRoomDisplay {
    id: number;
    name: string;
}

interface INavigationProps {
    dispatch: Dispatch<any>;
    selectedNavigationTab: number;
    rooms: IRoomDisplay[];
}

interface ILightSwitch {
    id: string | number;
    name: string;
}

interface IControlPanelTab {
    index: number;
    hash: string;
    name: string;
}

class Navigation extends React.Component<INavigationProps, {}> {

    private handlers: any;

    constructor(props : INavigationProps){
        super(props);
        
        this.handlers = this.createHandlers(props.dispatch);
    }

    private createHandlers(dispatch : Dispatch<any>){
        return {
            onSelectTab: (id: number) => dispatch(NavigationActions.SELECT_NAVIGATION_TAB(id))
        }
    }

    private renderControlPanelTab = () => {
        var isActive = this.props.selectedNavigationTab === 0;

        return (
            <NavigationTab key={0} id={0} isActive={isActive} hash={''} onSelectTab={this.handlers.onSelectTab}>
                Control Panel
            </NavigationTab>
        )
    }

    private renderRoomTab = (entry: IRoomDisplay, index: number) => {

        var isActive = this.props.selectedNavigationTab === entry.id;
        return (
            <NavigationTab key={index+1} id={entry.id} isActive={isActive} hash={entry.id.toString()} onSelectTab={this.handlers.onSelectTab}>
                {entry.name}
            </NavigationTab>
        )
    }

    private renderRoomTabs = () => {
        return _(this.props.rooms)
               .map(this.renderRoomTab)
            .sortBy((entry: IControlPanelTab) => entry.index)
            .value();
    }

    public render() {
        return (
            <ul className={style.list}>
                { this.renderControlPanelTab() }
                { this.renderRoomTabs() }
            </ul>
        );
    }
}


const mapStateToProps = (state: IAppState) => {
    return {
        selectedNavigationTab: state.navigation.selectedNavigationTab,
        rooms: _.map(state.config.rooms, (room) => { return { id: room.id, name: room.name } })
    }
};

export default connect(mapStateToProps)(Navigation);
