// react
import * as React from 'react';

// style
import * as style from '../../css/components/header.css';

// component ---------------------------------------------------------------------------------

export class Header extends React.Component<{}, {}> {

    public render() {

        return (
            <div className={style.container}>
                <span className={style.logo}>Home HUD</span>
            </div>
        );
    }
}
