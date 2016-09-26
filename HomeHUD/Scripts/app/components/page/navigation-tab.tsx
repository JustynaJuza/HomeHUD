import * as React from 'react';
import * as classNames from 'classnames';

import * as style from '../../../../content/component-styles/navigation-tab.css';

interface INavigationTabProps {
    id: number;
    isActive: boolean;
    hash: string;
    onSelectTab: (id : number) => void;
}

export class NavigationTab extends React.Component<INavigationTabProps, {}> {

    public render() {
        var tabClasses = classNames({
                [style.tab]: true,
                [style.active]: this.props.isActive
            })

        return (
            <li className={tabClasses}>
                <a href={`#/${this.props.hash}`} onClick={this.props.onSelectTab.bind(this, this.props.id)} className={style.link}>
                    <span className={style.name}>
                        {this.props.children}
                    </span>
                </a>
            </li>
        );
    }
}
