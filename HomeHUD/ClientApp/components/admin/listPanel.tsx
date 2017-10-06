import * as _map from 'lodash/map';
import * as _filter from 'lodash/filter';
import * as _indexOf from 'lodash/indexOf';

// react
import * as React from 'react'
import * as classNames from 'classnames';

// redux
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IAppState } from '../../state/state';
import { routerEntryMap } from '../../state/config/configState';
import { configActionCreators } from '../../state/config/configActionCreators';

// style
//import * as style from '../../../../css/components/room-panel.css';

import { Route } from 'react-router';
// component ---------------------------------------------------------------------------------

export interface IListItem {
    id: number;
    listApi: string;
    renderListEntry: () => string;
}

interface IPublicListPanelProps {
    entryName: string;
}

interface IListPanelProps extends IPublicListPanelProps {
    name: string;
    items: IListItem[];
}

type IListPanelPropsType =
    IListPanelProps
    & IPublicListPanelProps
    & typeof configActionCreators;

class ListPanel extends React.Component<IListPanelPropsType, {}> {

    public componentWillMount() {
        this.props.getList(routerEntryMap[this.props.entryName]);
    }

    private renderListItem(item: IListItem) {
        console.log(item)
        return <div> {item.renderListEntry()} </div>;
    }

    private renderList() {
        return _map(this.props.items, this.renderListItem);
    }

    public render() {
        if (this.props.items.length == 0) {
            this.props.getList(routerEntryMap[this.props.entryName]);
        }

        return (
            <div>
                <h2>{this.props.name}</h2>
                {this.renderList()}
            </div>
        );
    }
}

// redux ---------------------------------------------------------------------------------

export default connect(
    (state: IAppState, publicProps: IPublicListPanelProps) => {
        var configName = routerEntryMap[publicProps.entryName];

        return {
            name: configName,
            items: state.config[configName]
        };
    },
    configActionCreators
)(ListPanel);