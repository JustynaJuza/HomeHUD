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
import { IRoomConfig } from '../../state/config/configState';
import { ISelectedContent } from '../../state/nav/navState';

// components
import RoomNavTab from './roomNav.tab';

// style
import * as style from '../../css/components/roomNav.css';

// component ---------------------------------------------------------------------------------

interface IRoomNavProps {
    rooms: IRoomConfig[];
}

type IRoomNavPropsType =
    IRoomNavProps
    & IRouterParams;


class RoomNav extends React.Component<IRoomNavPropsType, {}> {

    private renderControlPanelTab = () => {
        console.log(this.props)
        return (
            <RoomNavTab key={0} hash={''} isActive={!this.props.params['hash']}>
                Control Panel
            </RoomNavTab>
        )
    }

    private renderRoomNavTab = (room: IRoomConfig, index: number) => {
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
            <ul className={style.list}>
                { this.renderControlPanelTab() }
                { this.renderRoomTabs() }
            </ul>
        );
    }
}

// redux ---------------------------------------------------------------------------------

export default connect(
    (state: IAppState, publicProps: IRouterParams) => ({
        rooms: _filter(state.config.rooms, room => room.lights.length > 0) as IRoomConfig[]
    }),
    null
)(RoomNav);
