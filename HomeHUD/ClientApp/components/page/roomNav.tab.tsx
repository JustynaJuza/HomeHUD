// react
import * as React from 'react'
import * as classNames from 'classnames';
import { Link } from 'react-router'
//import { NavLink } from 'react-router-dom'

// redux
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IAppState } from '../../state/state';
import { navActionCreators } from '../../state/nav/navActionCreators';

// style
import * as style from '../../css/components/roomNav.tab.css';

// component ---------------------------------------------------------------------------------

interface IRoomNavTabPublicProps {
    id: number;
    hash: string;
    isActive: boolean;
}

interface IRoomNavTabProps extends IRoomNavTabPublicProps {
    onSelectTab: (e: any, id: number) => void;
}

export class RoomNavTab extends React.Component<IRoomNavTabProps, {}> {

    public render() {
        var tabClasses = classNames({
                [style.tab]: true,
                [style.active]: this.props.isActive
            })

        return (
            <li className={tabClasses}>
                <Link to={`/r/${this.props.hash}`} onClick={(e) => this.props.onSelectTab(e, this.props.id)} className={style.link}>
                    <span className={style.name}>
                        {this.props.children}
                    </span>
                </Link>
            </li>
        );
    }
}

// redux ---------------------------------------------------------------------------------

const mapStateToProps = (state: IAppState, publicProps: IRoomNavTabPublicProps) => {
    return {};
};

const mapDispatchToProps = (dispatch: Dispatch<any>, publicProps: IRoomNavTabPublicProps) => ({
    onSelectTab(e: any, id: number) {
        //e.preventDefault();
        //history.pushState(null, null, publicProps.hash);

        //dispatch(navActionCreators.selectContent({ type: 'ROOM', id: id }));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomNavTab);
