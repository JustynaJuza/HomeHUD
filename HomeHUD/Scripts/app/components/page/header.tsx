import * as React from 'react';
import * as style from '../../../../content/component-styles/header.css';

interface IHeaderProps {
}

export class Header extends React.Component<IHeaderProps, {}> {

    public render() {

        return (
            <div className={style.container}>
                <span className={style.logo}>Home HUD</span>
            </div>
        );
    }
}
