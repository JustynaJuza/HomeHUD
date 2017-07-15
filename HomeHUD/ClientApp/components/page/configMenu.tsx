// react
import * as React from 'react'

// redux
import { connect } from 'react-redux';
import { IAppState } from '../../state/state';
import { requestActionCreators } from '../../state/request/requestActionCreators';

import { Api } from '../../state/api';

// style
import * as style from '../../css/components/config-menu.css';

// component ---------------------------------------------------------------------------------

interface IConfigMenuProps {
    baseUrl: string;
    isAuthenticated: boolean;
    userName: string;
}

type IConfigMenuPropsType =
    IConfigMenuProps
    & typeof requestActionCreators;

class ConfigMenu extends React.Component<IConfigMenuPropsType, {}> {

    private api: Api = new Api();

    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
    }

    private logOut() {
        return this.api.postJson(this.props.baseUrl + '/Account/Logout')
            .then(() => this.props.logOut())
    }

    public render() {
        if (!this.props.isAuthenticated) {
            return null;
        }

        return (
            <ul className={style.list}>
                <li>
                    <button className={style.button} title="Manage rooms">
                        <div className={style.settings}></div>
                        <span className={style.title}>Manage rooms</span>
                    </button>
                </li>
                <li>
                    <button className={style.button} title="Log out" onClick={this.logOut}>
                        <div className={style.logoff}></div>
                        <span className={style.title}>Log out</span>
                    </button>
                </li>
            </ul>
        );
    }
}

// redux ---------------------------------------------------------------------------------

export default connect(
    (state: IAppState) => ({
        baseUrl: state.request.baseUrl,
        isAuthenticated: state.request.isAuthenticated,
        userName: state.request.user ? state.request.user.name : null
    }),

    requestActionCreators
)(ConfigMenu);