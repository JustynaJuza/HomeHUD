// react
import * as React from 'react'

// redux
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IAppState } from '../../state/store';
import { authenticationActions } from '../../state/authentication/authenticationActions';

// props
import { IRoomConfig } from '../../state/config/configState';
import { ISelectedContent } from '../../state/navigation/navigationState';

// style
import * as style from '../../css/components/config-menu.css';

// component ---------------------------------------------------------------------------------

interface IConfigMenuProps {
    isAuthenticated: boolean;
    userName: string;
    logoff: () => void;
}

class ConfigMenu extends React.Component<IConfigMenuProps, {}> {

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
                    <button className={style.button} title="Log off" onClick={() => this.props.logoff()}>
                        <div className={style.logoff}></div>
                        <span className={style.title}>Log off</span>
                    </button>
                </li>
            </ul>
        );
    }
}

// redux ---------------------------------------------------------------------------------

const mapStateToProps = (state: IAppState) => {

    return {
        isAuthenticated: state.authentication.isAuthenticated,
        userName: state.authentication.userName
    }
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    logoff() { dispatch(authenticationActions.LOGOFF()); }
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfigMenu);
