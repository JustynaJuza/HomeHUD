// react
import * as React from 'react'
import TextField from 'material-ui/TextField';

// redux
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IAppState, api } from '../../../state/app';
import { IFormResult } from '../../../state/formResult';
import { authenticationActions } from '../../../state/authentication/authenticationActions';

// props
import { Api } from '../../../state/api';
import LoginForm from '../form/loginForm';

// style
import * as style from '../../../../../content/component-styles/login-panel.css';

// component ---------------------------------------------------------------------------------

interface ILoginPanelProps {
    login: () => void;
}

export class LoginPanel extends React.Component<ILoginPanelProps, {}> {

    //private processLoginResponse(formResult: IFormResult) {

    //    if (formResult.success) {
    //        this.props.login();
    //    }
    //    else {
    //        handleLoginFailure(formResult.errors);
    //    }
    //}

    //private submit(values: any) {
        //api.postJson('/Home/Login', values)
        //    .then(this.processLoginResponse);

    //}

    public render() {

        return (
            <LoginForm />

            //<div>
            //    <div className={style.container}>
            //        <TextField hintText="" floatingLabelText="Username" />
            //        <TextField type="password" hintText="" floatingLabelText="Password" />
            //        <button className={style.button} onClick={() => this.props.login()}>Log in</button>
            //    </div>
            //</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginPanel);
