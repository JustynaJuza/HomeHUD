import * as _map from 'lodash/map';
import * as _filter from 'lodash/filter';
import * as _sortBy from 'lodash/sortBy';

// react
import * as React from 'react'

// redux
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IAppState } from '../../state/state';

// props
import { IRoomConfig } from '../../state/config/configState';
import { ISelectedContent } from '../../state/nav/navState';

// components
import NavigationTab from './navigation-tab';

// style
import * as style from '../../css/components/navigation.css';

// component ---------------------------------------------------------------------------------

interface INavigationProps {
    isAuthenticated: boolean;
    selectedContent: ISelectedContent;
    rooms: IRoomConfig[];
}

class Navigation extends React.Component<INavigationProps, {}> {

    private selectedRoomId: number = null;

    private setSelectedRoom(): void {

        if (this.props.selectedContent.type === 'ROOM') {
            this.selectedRoomId = this.props.selectedContent.id;
        }
    }

    private renderControlPanelTab = () => {
        return (
            <NavigationTab key={0} id={0} hash={''} isActive={this.selectedRoomId === 0}>
                Control Panel
            </NavigationTab>
        )
    }

    private renderRoomTab = (room: IRoomConfig, index: number) => {
        return (
            <NavigationTab key={index + 1} id={room.id} hash={room.hash} isActive={room.id === this.selectedRoomId}>
                {room.name}
            </NavigationTab>
        )
    }

    private renderRoomTabs = () => {
        return _map(_sortBy(this.props.rooms, room => room.sortWeight), this.renderRoomTab);
    }

    public render() {
        if (!this.props.isAuthenticated) {
            return null;
        }

        this.setSelectedRoom();

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
        isAuthenticated: true, //state.authentication.isAuthenticated,
        selectedContent: state.navigation.selectedContent,
        rooms: _filter(state.config.rooms, room => room.lights.length > 0)
    }
};

export default connect(mapStateToProps)(Navigation);
