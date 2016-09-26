import * as React from 'react';
import * as classNames from 'classnames';
import { connect } from 'react-redux';

import { IAppState } from '../../state/app';

import ControlPanel from './content/controlPanel';
import RoomPanel from './content/roomPanel';

import * as style from '../../../../content/component-styles/layout.css';

interface IContentProps {
    selectedNavigationTab: number;
}

class Content extends React.Component<IContentProps, {}> {

    public render() {
    	var content = this.props.selectedNavigationTab === 0
        ? <ControlPanel />
        : <RoomPanel />;

        return (
            <div className={style.content}>
                { content }
            </div>
        );
    }
}

const mapStateToProps = (state: IAppState) => {
    return {
        selectedNavigationTab: state.navigation.selectedNavigationTab
    }
};

export default connect(mapStateToProps)(Content);