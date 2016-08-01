//var isNode = typeof module !== 'undefined' && module.exports;
//var React = isNode ? require('react') : window.React;
//var ReactDOM = isNode ? require('react') : window.ReactDOM;

import * as React from 'react';
import * as classNames from 'classnames';

import * as style from './../../styles/hud.css';

//import { Component } from "react";
//import { Tab, Tabs, TabList, TabPanel } from './tabs/exports'

interface IHudProps {
    compiler: string;
    framework: string;
}

class Hud extends React.Component<IHudProps, {}> {
    public render() {

        var hudClass = classNames(
            style.hud
        );

        return (
            <div className={style.hud}>
                <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>
                <TabManager />
            </div>
        );
    }
}

interface ITabManagerProps {
}

class TabManager extends React.Component<ITabManagerProps, {}> {
    public render() {

        var tabManagerClass = classNames(
            'tab-manager'
        );

        return (
            <div className={tabManagerClass}>
                <TabBar />
                <TabContent />
            </div>
        );
    }
}

interface ITabBarProps {
}

class TabBar extends React.Component<ITabBarProps, {}> {
    public render() {

        var tabBarClass = classNames(
            'tab-bar horizontal'
        );

        return (
            <ul className={tabBarClass}>
                <Tab index={1}>1</Tab>
                <Tab index={2}>2</Tab>
            </ul>
        );
    }
}

interface ITabProps {
    index: number;
}

interface ITabState {
    isActive: boolean;
}

class Tab extends React.Component<ITabProps, ITabState> {
    constructor() {
        super();
        this.state = {
            isActive: false
        }
    }

    public render() {
        var tabClass = classNames(
            'tab',
            {
                'active': this.state.isActive
            }
        );


        return (
            <li className={tabClass}>
                <span>Tab {this.props.index} </span>
            </li>
        );
    }
}

class TabContent extends React.Component<{}, {}> {
    public render() {
        return (
            <div>
            </div>
        );
    }
}

// class Tab extends React.Component {
// 
// getDefaultProps() {
// return {
// hasFocus: false,
// isSelected: false,
// id: null,
// panelId: null
// };
// },
// 
// render() {
// return
// <div className="tab">
// <Overview>
// <Tab>1</Tab>
// <Tab>2</Tab>
// <Tab>3</Tab>
// </div>
// }
// }

// if (isNode) {
//     exports.Hud = Hud
// } else {
//     ReactDOM.render(<Hud />, document.getElementById('hud'))
// }

export { Hud, TabManager, TabBar, Tab, TabContent };

