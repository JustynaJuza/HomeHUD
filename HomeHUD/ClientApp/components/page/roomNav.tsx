import * as _map from 'lodash/map';
import * as _filter from 'lodash/filter';
import * as _sortBy from 'lodash/sortBy';

// react
import * as React from 'react'

// redux
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IAppState } from '../../state/state';
import { IRouterParams } from '../../router';

// props
import { IRoom } from '../../state/config/configState';
import { ISelectedContent } from '../../state/nav/navState';

// components
import RoomNavTab from './roomNav.tab';

// style
import * as style from '../../css/components/roomNav.css';

// component ---------------------------------------------------------------------------------

interface IRoomNavProps {
    rooms: IRoom[];
}

type IRoomNavPropsType =
    IRoomNavProps
    & IRouterParams;


class RoomNav extends React.Component<IRoomNavPropsType, {}> {

    private renderControlPanelTab = () => {
        return (
            <RoomNavTab key={0} hash={''} isActive={!this.props.params['hash']}>
                Control Panel
            </RoomNavTab>
        )
    }

    private renderRoomNavTab = (room: IRoom, index: number) => {
        return (
            <RoomNavTab key={index + 1} hash={room.hash} isActive={room.hash == this.props.params['hash']}>
                {room.name}
            </RoomNavTab>
        )
    }

    private renderRoomTabs = () => {
        return _map(_sortBy(this.props.rooms, room => room.sortWeight), this.renderRoomNavTab);
    }

    public render() {

        return (
            <div className={style.container}>
                <ul className={style.list}>
                    { this.renderControlPanelTab() }
                    { this.renderRoomTabs() }
                </ul>
            </div>
        );
    }
}

// redux ---------------------------------------------------------------------------------

export default connect(
    (state: IAppState, publicProps: IRouterParams) => ({
        rooms: _filter(state.config.rooms, room => room.lights.length > 0) as IRoom[]
    }),
    null
)(RoomNav);
