// react
import * as React from 'react'
import TextField from 'material-ui/TextField';

// redux
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IAppState } from '../../../state/app';
import { authenticationActions } from '../../../state/authentication/authenticationActions';

// style
import * as style from '../../../../../content/component-styles/login-panel.css';

// component ---------------------------------------------------------------------------------

interface ILoginPanelProps {
    login: () => void;
}

export class LoginPanel extends React.Component<ILoginPanelProps, {}> {
    
    public render() {

        return (
            <div>
                <div className={style.container}>
                    <TextField hintText="" floatingLabelText="Username" />
                    <TextField type="password" hintText="" floatingLabelText="Password" />
                    <button className={style.button} onClick={() => this.props.login()}>Log in</button>
                </div>
            </div>
        );
    }
}

// redux ---------------------------------------------------------------------------------

const mapStateToProps = (state: IAppState) => {
    return {
    }
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    login() { dispatch(authenticationActions.LOGIN({ userName: 'juza' })); }
});

export default connect(mapStateToProps)(LoginPanel);
