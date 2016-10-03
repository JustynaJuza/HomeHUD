// react
import * as React from 'react'

// redux
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IAppState } from '../../state/app';

// components
import RoomPanel from './content/roomPanel';
import ControlPanel from './content/controlPanel';

// style
import * as style from '../../../../content/component-styles/layout.css';

// component ---------------------------------------------------------------------------------

interface IContentProps {
    selectedNavigationTab: number;
}

class Content extends React.Component<IContentProps, {}> {

    public render() {
    	var content = this.props.selectedNavigationTab === 0
            ? <ControlPanel />
            : <RoomPanel showName={false} id={this.props.selectedNavigationTab} />;

        return (
            <div className={style.content}>
                { content }
            </div>
        );
    }
}

// redux ---------------------------------------------------------------------------------

const mapStateToProps = (state: IAppState) => {
    return {
        selectedNavigationTab: state.navigation.selectedNavigationTab        
    }
};

export default connect(mapStateToProps)(Content);