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
    renderListEntry: () => any;
    getListColumns: () => any[];
}

interface IPublicListPanelProps {
    entryName: string;
}

interface IListPanelProps extends IPublicListPanelProps {
    name: string;
    items: IListItem[];
}

type ListPanelPropsType =
    IListPanelProps
    & IPublicListPanelProps
    & typeof configActionCreators;

class ListPanel extends React.Component<ListPanelPropsType, {}> {

    public componentWillMount() {
        this.props.getList(routerEntryMap[this.props.entryName]);
    }

    public componentWillReceiveProps(nextProps: ListPanelPropsType) {
        if (this.props.entryName !== nextProps.entryName) {
            this.props.getList(routerEntryMap[nextProps.entryName]);
        }
    }

    public shouldComponentUpdate(nextProps: ListPanelPropsType, nextState) {
        return this.props.entryName !== nextProps.entryName
            || this.props.items.length !== nextProps.items.length;
    }

    private renderListItem(item: IListItem) {
        return <div> {item.renderListEntry()} </div>;
    }

    private renderList() {
        return _map(this.props.items, this.renderListItem);
    }

    public render() {

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