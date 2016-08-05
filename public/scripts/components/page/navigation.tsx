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
<li className={style.tab}>
<a href="#" className={style.link}>Control Panel</a>
</li>
<li className={style.tab}>
<a href="#" className={style.link}>Gaming room</a>
</li>
<li className={style.tab}>
<a href="#" className={style.link}>Bedroom</a>
</li>
<li className={style.tab}>
<a href="#" className={style.link}>Living room</a>
</li>
</ul>
               );
    }
}

export { Navigation };

