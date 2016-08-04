import * as React from 'react';
import * as classNames from 'classnames';

import * as style from './../../../styles/navigation.css';

interface INavigationProps {
}

interface INavigationState {
}

class Navigation extends React.Component<INavigationProps, INavigationState> {
    public render() {

        return (
            <ul className={style.list}>
<li className={style.tab}>All</li>
<li className={style.tab}>One</li>
<li className={style.tab}>Two</li>
<li className={style.tab}>Three</li>
</ul>
               );
    }
}

export { Navigation };

