import * as _map from "lodash/map";
import * as _sortBy from "lodash/sortBy";
import * as _flow from "lodash/flow";

// react
import * as React from 'react'

// redux
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IAppState } from '../../state/app';

// components
import NavigationTab from './navigation-tab';

// style

import * as style from '../../../../content/component-styles/navigation.css';

// component ---------------------------------------------------------------------------------

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

//interface IControlPanelTab {
//    index: number;
//    hash: string;
//    name: string;
//}

class Navigation extends React.Component<INavigationProps, {}> {

    private renderControlPanelTab = () => {
        var isActive = this.props.selectedNavigationTab === 0;

        return (
            <NavigationTab key={0} id={0} hash={''}>
                Control Panel
            </NavigationTab>
        )
    }

    private renderRoomTab = (entry: IRoomDisplay, index: number) => {

        var isActive = this.props.selectedNavigationTab === entry.id;
        return (
            <NavigationTab key={index+1} id={entry.id} hash={entry.id.toString()}>
                {entry.name}
            </NavigationTab>
        )
    }

    //private mapToComponents() {
    //    return _map(this.props.rooms, this.renderRoomTab);
    //}

    //private sortByIndex(roomTabs: IControlPanelTab[]) {
    //    return _sortBy(roomTabs, (entry: IControlPanelTab) => entry.index);
    //}

    private renderRoomTabs = () => {
        //return _flow(
        //    this.mapToComponents,
        //    this.sortByIndex);
        return _map(this.props.rooms, this.renderRoomTab);
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

// redux ---------------------------------------------------------------------------------

const mapStateToProps = (state: IAppState) => {
    return {
        selectedNavigationTab: state.navigation.selectedNavigationTab,
        rooms: _map(state.config.rooms, (room) => { return { id: room.id, name: room.name } })
    }
};

export default connect(mapStateToProps)(Navigation);
