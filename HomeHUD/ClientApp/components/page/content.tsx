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
import RoomPanel from './content/roomPanel';
import ControlPanel from './content/controlPanel';
//import LoginPanel from './content/loginPanel';

// style
import * as style from '../../css/components/layout.css';

// component ---------------------------------------------------------------------------------

interface IContentProps extends IRouterParams {
    isAuthenticated: boolean;
    selectedContent: ISelectedContent;
    error: IError;
};


class Content extends React.Component<IContentProps, {}> {
    //static contextTypes = {
    //    router: PropTypes.object.isRequired
    //};

    private getSelectedRoom(): number {
        return this.props.selectedContent.type === 'ROOM'
            ? this.props.selectedContent.id
            : 0;
    }

    private getContent() {
        var roomId = this.getSelectedRoom();
        return roomId === 0
            ? <ControlPanel />
            : <RoomPanel id={roomId} showName={false} showBulkSwitches={true}/>;
    }

    public render() {
        console.log(this.props)
        console.log(this.state)

        return (
            <div className={style.content}>

                { this.props.error
                    ? this.props.isAuthenticated
                        ? <div>{ this.props.error.message }</div>
                        : <div>{ this.props.error.message }</div>
                    : this.props.isAuthenticated
                        ? this.getContent()
                        : <div></div>
                }
            </div>
        );
    }
    //<LoginPanel />
}

// redux ---------------------------------------------------------------------------------

const mapStateToProps = (state: IAppState, ownProps: IRouterParams) => {
    return {
        isAuthenticated: true,
        selectedContent: state.navigation.selectedContent,
        error: state.navigation.error
    }
};

export default connect(mapStateToProps)(Content);