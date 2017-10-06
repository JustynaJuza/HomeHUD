// react
import * as React from 'react'
import * as classNames from 'classnames';
import { Link } from 'react-router'
//import { NavLink } from 'react-router-dom'

// style
import * as style from '../../css/components/roomNav.tab.css';

// component ---------------------------------------------------------------------------------

interface INavTabProps {
    hash: string | string[];
    isActive: boolean;
}

export class NavTab extends React.Component<INavTabProps, {}> {

    private getHash() {
        if (this.props.hash instanceof Array) {
            return this.props.hash[0] || '';
        }
         return this.props.hash || '';
    }

    public render() {
        var tabClasses = classNames({
                [style.tab]: true,
                [style.active]: this.props.isActive
            });

        return (
            <li className={tabClasses}>
                <Link to={`/manage/${this.getHash()}`} className={style.link}>
                    <span className={style.name}>
                        {this.props.children}
                    </span>
                </Link>
            </li>
        );
    }
}

// redux ---------------------------------------------------------------------------------
export default NavTab;
