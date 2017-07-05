import * as _map from 'lodash/map';
import * as _filter from 'lodash/filter';
import * as _sortBy from 'lodash/sortBy';

// react
import * as React from 'react'
import { withRouter } from 'react-router-dom'
import { IRouterParams } from '../../router';


// redux
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IAppState } from '../../state/state';

// props
import { IRoomConfig } from '../../state/config/configState';
import { ISelectedContent } from '../../state/nav/navState';

// components
import RoomNavTab from './roomNav.tab';

// style
import * as style from '../../css/components/roomNav.css';

// component ---------------------------------------------------------------------------------

interface IRoomNavProps extends IRouterParams {
    isAuthenticated: boolean;
    selectedContent: ISelectedContent;
    rooms: IRoomConfig[];
}

class RoomNav extends React.Component<IRoomNavProps, {}> {

    private selectedRoomId: number = null;

    private setSelectedRoom(): void {

        if (this.props.selectedContent.type === 'ROOM') {
            this.selectedRoomId = this.props.selectedContent.id;
        }
    }

    private renderControlPanelTab = () => {
        return (
            <RoomNavTab key={0} id={0} hash={''} isActive={this.selectedRoomId === 0}>
                Control Panel
            </RoomNavTab>
        )
    }

    private renderRoomNavTab = (room: IRoomConfig, index: number) => {
        return (
            <RoomNavTab key={index + 1} id={room.id} hash={room.hash} isActive={room.id === this.selectedRoomId}>
                {room.name}
            </RoomNavTab>
        )
    }

    private renderRoomTabs = () => {
        return _map(_sortBy(this.props.rooms, room => room.sortWeight), this.renderRoomNavTab);
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
        rooms: _filter(state.config.rooms, room => room.lights.length > 0) as IRoomConfig[]
    }
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(RoomNav);
