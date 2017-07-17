// react
import * as React from 'react'

// redux
import { IRouterParams } from '../../router';

// components
import RoomNav from './roomNav';
import RoomPanel from './content/roomPanel';
import ControlPanel from './content/controlPanel';

// component ---------------------------------------------------------------------------------

class RoomContent extends React.Component<IRouterParams, {}> {

    private renderSelectedRoom() {
        var roomHash = this.props.params['hash'];
        return roomHash
            ? <RoomPanel hash={roomHash} showName={false} showBulkSwitches={true}/>
            : <ControlPanel />
    }

    public render() {
        const { params, location } = this.props;

        return (
            <div>
                <RoomNav {...{ params, location }}/>
                { this.renderSelectedRoom() }
            </div>
        );
    }
}

export default RoomContent;