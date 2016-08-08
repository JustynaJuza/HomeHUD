import * as React from 'react';
import * as classNames from 'classnames';

import * as style from './../../../styles/header.css';

interface IHeaderProps {
}

interface IHeaderState {
}

class Header extends React.Component<IHeaderProps, IHeaderState> {
    public render() {

        return (
            <div className={style.container}>
				<span className={style.logo}>Home HUD</span>
			</div>
		);
    }
}

export { Header };

