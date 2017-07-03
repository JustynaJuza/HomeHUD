// react
import * as React from 'react'

// redux
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IAppState } from '../../state/state';
import { IRouterParams } from '../../router';

// props
import { ISelectedContent, IError } from '../../state/nav/navState';

// components
import RoomNav from './roomNav';
import RoomPanel from './content/roomPanel';
import ControlPanel from './content/controlPanel';

// style
import * as style from '../../css/components/layout.css';

// component ---------------------------------------------------------------------------------

interface IContentProps extends IRouterParams {
    isAuthenticated: boolean;
    selectedContent: ISelectedContent;
    error: IError;
};


class RoomContent extends React.Component<IContentProps, {}> {

    private getSelectedRoom(): any {
        var roomHash = this.props.params['hash'];
        console.log(roomHash)
        return roomHash
            ? <RoomPanel hash={roomHash} showName={false} showBulkSwitches={true}/>
            : <ControlPanel />
    }

    public render() {

        return (
            <div  className={style.content}>
                <RoomNav />
                { this.getSelectedRoom() }
            </div>
        );
    }
}

// redux ---------------------------------------------------------------------------------

const mapStateToProps = (state: IAppState, ownProps: IRouterParams) => {
    return {
        isAuthenticated: true,
        selectedContent: state.navigation.selectedContent,
        error: state.navigation.error
    }
};

const mapDispatchToProps = (dispatch: Dispatch<any>, publicProps: IRouterParams) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomContent);