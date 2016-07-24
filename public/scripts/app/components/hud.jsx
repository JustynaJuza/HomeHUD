//var isNode = typeof module !== 'undefined' && module.exports;
//var React = isNode ? require('react') : window.React;
//var ReactDOM = isNode ? require('react') : window.ReactDOM;

import React from 'react';
//import { Tab, Tabs, TabList, TabPanel } from './tabs/exports'

class Hud extends React.Component {

    render() {
        return <div className="hud">
        	<Overview>
        	<Tab>1</Tab>
        	<Tab>2</Tab>
        	<Tab>3</Tab>
        </div>
    }
}

class Tab extends React.Component {

    getDefaultProps() {
            return {
                hasFocus: false,
                isSelected: false,
                id: null,
                panelId: null
            };
        },

        render() {
            return <div className="tab">
        	<Overview>
        	<Tab>1</Tab>
        	<Tab>2</Tab>
        	<Tab>3</Tab>
        </div>
        }
}

export default Hud;


// if (isNode) {
//     exports.Hud = Hud
// } else {
//     ReactDOM.render(<Hud />, document.getElementById('hud'))
// }
