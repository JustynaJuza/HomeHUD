// react
import * as React from 'react'
import * as classNames from 'classnames';
import { Link } from 'react-router'
//import { NavLink } from 'react-router-dom'

// style
import * as style from '../../css/components/roomNav.tab.css';

// component ---------------------------------------------------------------------------------

interface IRoomNavTabProps {
    hash: string;
    isActive: boolean;
}

export class RoomNavTab extends React.Component<IRoomNavTabProps, {}> {

    public render() {
        var tabClasses = classNames({
                [style.tab]: true,
                [style.active]: this.props.isActive
            })

        return (
            <li className={tabClasses}>
                <Link to={`/r/${this.props.hash}`} className={style.link}>
                    <span className={style.name}>
                        {this.props.children}
                    </span>
                </Link>
            </li>
        );
    }
}

// redux ---------------------------------------------------------------------------------
export default RoomNavTab;
