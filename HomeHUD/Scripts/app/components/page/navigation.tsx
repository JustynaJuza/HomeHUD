import * as _map from "lodash/map";
import * as _filter from "lodash/filter";
import * as _sortBy from "lodash/sortBy";

// react
import * as React from 'react'

// redux
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IAppState } from '../../state/app';

// props
import { IRoomConfig } from '../../state/config/configState';

// components
import NavigationTab from './navigation-tab';

// style

import * as style from '../../../../content/component-styles/navigation.css';

// component ---------------------------------------------------------------------------------

interface INavigationProps {
    dispatch: Dispatch<any>;
    selectedNavigationTab: number;
    rooms: IRoomConfig[];
}

class Navigation extends React.Component<INavigationProps, {}> {

    private renderControlPanelTab = () => {
        return (
            <NavigationTab key={0} id={0} hash={''}>
                Control Panel
            </NavigationTab>
        )
    }

    private renderRoomTab = (room: IRoomConfig, index: number) => {        
        return (
            <NavigationTab key={index + 1} id={room.id} hash={room.hash}>
                {room.name}
            </NavigationTab>
        )
    }

    private renderRoomTabs = () => {
        return _map(_sortBy(this.props.rooms, room => room.sortWeight), this.renderRoomTab);
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
        rooms: _filter(state.config.rooms, room => room.lights.length > 0)
    }
};

export default connect(mapStateToProps)(Navigation);
