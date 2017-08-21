// react
import * as React from 'react'
import { browserHistory, Link } from 'react-router';

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

    private renderManagementLinks() {
        return this.props.isAuthenticated
            ? (
                <li>
                    <Link to='/users'>
                        <button className={style.button} title="Manage">
                            <div className={style.settings}></div>
                            <span className={style.title}>Manage</span>
                        </button>
                    </Link>
                </li>
            )
            : null;
    }

    private renderAuthenticationLink() {
        var hintText = this.props.isAuthenticated ? 'Log out' : 'Log in';
        var linkAction = this.props.isAuthenticated
            ? this.logOut
            : () => { browserHistory.push('/login') };

        return (
            <li>
                <button className={style.button} title={hintText} onClick={linkAction}>
                    <div className={style.logoff}></div>
                    <span className={style.title}>{hintText}</span>
                </button>
            </li>
        );
    }

    public render() {

        return (
            <ul className={style.list}>

                {this.renderManagementLinks()}

                {this.renderAuthenticationLink()}

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