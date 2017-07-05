// react
import * as React from 'react'

// redux
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IAppState } from '../../state/state';
import { IRouterParams } from '../../router';
import { withRouter } from 'react-router-dom'

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

    public componentWillReceiveProps(nextProps) {
        console.log(this.props)
    }

    //public shouldComponentUpdate(nextProps, nextState) {

    //    console.log(this.props, nextProps)
    //}

    private getSelectedRoom(): any {
        console.log(this.props)
        var roomHash = this.props.location.pathname.replace('rooms/', '').replace('/','');
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

const mapStateToProps = (state: IAppState, ownProps: IContentProps) => {
    return {
        isAuthenticated: true,
        selectedContent: state.navigation.selectedContent,
        error: state.navigation.error
    }
};

const mapDispatchToProps = (dispatch: Dispatch<any>, publicProps: IRouterParams) => ({
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RoomContent));