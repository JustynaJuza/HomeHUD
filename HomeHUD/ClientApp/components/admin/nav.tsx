import * as _map from 'lodash/map';
import * as _filter from 'lodash/filter';
import * as _sortBy from 'lodash/sortBy';
import * as _indexOf from 'lodash/indexOf';

// react
import * as React from 'react'

// redux
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IAppState } from '../../state/state';
import { IRouterParams } from '../../router';

// components
import NavTab from './nav.tab';
import { routerEntryMap } from '../../state/config/configState';

// style
import * as style from '../../css/components/roomNav.css';

// component ---------------------------------------------------------------------------------

interface INavTab {
    name: string;
    hash: string | string[];
}

interface INavProps {
    tabs: INavTab[];
}

type INavPropsType =
    INavProps
    & IRouterParams;


class Nav extends React.Component<INavPropsType, {}> {

    private activateNavTab(hash) {
        if (!hash) return false;

        if(hash instanceof Array) {
            return _indexOf(hash, this.props.params['hash']) > -1
        }

        return hash == this.props.params['hash']
    }

    private renderTab = (tab: INavTab, index: number) => {
        return (
            <NavTab key={index} hash={tab.hash} isActive={this.activateNavTab(tab.hash)}>
                {tab.name}
            </NavTab>
        )
    }

    private renderTabs = () => {
        return _map(_sortBy(this.props.tabs, t => t.name), this.renderTab);
    }

    public render() {
        const { params, location } = this.props;

        return (
            <div className={style.container}>
                <ul className={style.list}>
                    {this.renderTabs()}
                </ul>
            </div>
        );
    }
}

export default connect(
    (state: IAppState, publicProps: IRouterParams) => ({
        tabs: _map(
            Object.getOwnPropertyNames(state.config),
            configEntry => ({
                name: configEntry,
                hash: _filter(Object.getOwnPropertyNames(routerEntryMap), x => routerEntryMap[x] == configEntry)
            })) as INavTab[]
    }),
    null
)(Nav);