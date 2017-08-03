// react
import * as React from 'react';
import { Link } from 'react-router'

import ConfigMenu from './configMenu';

// style
import * as style from '../../css/components/header.css';

// component ---------------------------------------------------------------------------------

export class Header extends React.Component<{}, {}> {

    public render() {

        return (
            <div className={style.container}>
                <Link to={`/`}>
                    <span className={style.logo}>Home HUD</span>
                </Link>
                <ConfigMenu />
            </div>
        );
    }
}
