// react
import * as React from 'react'

// redux
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IAppState } from '../../state/app';

// props
import { ISelectedContent } from '../../state/navigation/navigationState';

// components
import RoomPanel from './content/roomPanel';
import ControlPanel from './content/controlPanel';

// style
import * as style from '../../../../content/component-styles/layout.css';

// component ---------------------------------------------------------------------------------

interface IContentProps {
    selectedContent: ISelectedContent;
    errorMessage: string;
}

class Content extends React.Component<IContentProps, {}> {

    private getSelectedRoom(): number {
        return this.props.selectedContent.type === 'ROOM'
            ? this.props.selectedContent.id
            : 0;
    }

    private getContent() {
        var roomId = this.getSelectedRoom();
        return roomId === 0
            ? <ControlPanel />
            : <RoomPanel showName={false} id={roomId} />;
    }

    public render() {

        return (
            <div className={style.content}>
                {
                    this.props.errorMessage.length
                        ? <div>{ this.props.errorMessage }</div>
                        : this.getContent()
                }
            </div>
        );
    }
}

// redux ---------------------------------------------------------------------------------

const mapStateToProps = (state: IAppState) => {
    return {
        selectedContent: state.navigation.selectedContent,
        errorMessage: state.navigation.errorMessage
    }
};

export default connect(mapStateToProps)(Content);