import * as React from 'react';
import { Router, Route, HistoryBase } from 'react-router';
import Layout from './components/page/layout';
//import Home from './components/Home';
//import FetchData from './components/FetchData';
//import Counter from './components/Counter';

export default
    <Route path='/' component={Layout}>
    </Route>;

//<Route path='/' component={Layout} />
    //<Route path='/counter' components={{ body: Counter }} />
    //<Route path='/fetchdata' components={{ body: FetchData }}>
    //    <Route path='(:startDateIndex)' /> { /* Optional route segment that does not affect NavMenu highlighting */ }
    //</Route>

// Enable Hot Module Replacement (HMR)
if (module.hot) {
    module.hot.accept();
}
