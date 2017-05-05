// react
import * as React from 'react';

// redux
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IAppState } from '../../../state/store';
import { IFormResult } from '../../../state/formResult';
import { authenticationActions } from '../../../state/authentication/authenticationActions';

// props
import { Api } from '../../../state/api';
import { formatSubmitErrors, render } from './loginForm';

// style
import * as style from '../../../css/components/login-panel.css';

// component ---------------------------------------------------------------------------------

interface ILoginFormProps {
    login: () => void;
}

interface ILoginForm {
    username?: string;
    password?: string;
}

interface IField {
    input: string;
    label: string;
    type: string;
    meta: any;
}

export class LoginForm extends React.Component<ILoginFormProps, {}> {

    private api = new Api();

    public render() {
        return render(this);
    }

    public processResponse(formResult: IFormResult) {
        if (formResult.success) {
            this.props.login();
            return Promise.resolve();
        }
        else {
            return Promise.reject(formResult.errors);
        }
    }

    public submit(values: any) {
        return this.api.postJson('/Home/Login', values)
            .then(this.processResponse.bind(this))
            .catch(formatSubmitErrors);
    }

    public static validate(values: ILoginForm) {
        const errors: ILoginForm = {};

        if (!values.username) {
            errors.username = 'Waiting for input';
        }
        else if (values.username.length > 15) {
            errors.username = 'Keep it under 15 characters please';
        }

        if (!values.password) {
            errors.password = 'Waiting for input'
        }

        return errors;
    }

    public renderField = ({ input, label, type, meta: { touched, error } }: IField) => {
        return (
            <div className={style.field}>
                
            </div>
        );
        //<label className={style.label} htmlFor="username">{label}</label>
        //    <input {...input} type={type} className={style.input} />
        //        {touched && error && <span className={style.field_error}>{error}</span> }
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);