// react
import * as React from 'react';

// redux
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IAppState, api } from '../../../state/app';
import { IFormResult } from '../../../state/formResult';
import { authenticationActions } from '../../../state/authentication/authenticationActions';

// props
import { Api } from '../../../state/api';
import { handleLoginFailure } from './loginForm';

// component ---------------------------------------------------------------------------------

interface ILoginFormProps {
    login: () => void;
}

export default class LoginForm extends React.Component<ILoginFormProps, {}> {

    private processLoginResponse(formResult: IFormResult) {

        console.log(formResult)
        if (formResult.success) {
            this.props.login();
        }
        else {
            console.log(formResult)
            handleLoginFailure(formResult.errors);
        }
    }

    public submit(values: any) {
        console.log(this)

        api.postJson('/Home/Login', values)
            .then(this.processLoginResponse);
    }

    public validate(values: any) {
        const errors = {}
        //if (!values.username) {
        //    errors.username = 'Required'
        //} else if (values.username.length > 15) {
        //    errors.username = 'Must be 15 characters or less'
        //}
        //if (!values.email) {
        //    errors.email = 'Required'
        //} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        //    errors.email = 'Invalid email address'
        //}
        //if (!values.age) {
        //    errors.age = 'Required'
        //} else if (isNaN(Number(values.age))) {
        //    errors.age = 'Must be a number'
        //} else if (Number(values.age) < 18) {
        //    errors.age = 'Sorry, you must be at least 18 years old'
        //}
        return errors
    }

    //public form({error: any, handleSubmit: any, pristine: any, reset: any, submitting: any }) {
    //    return (
    //        <form onSubmit= { handleSubmit(this.submit) } className= { style.container } >
    //            <div className={style.field}>
    //                <label className={style.label} htmlFor="username">User</label>
    //                <Field className={style.input} name="username" type="text" component="input" label="Name" />
    //            </div>
    //            <div className={style.field}>
    //                <label className={style.label} htmlFor="password">Password</label>
    //                <Field className={style.input} name="password" type="password" component="input" label="Password" />
    //            </div>
    //            <button type="submit" className={style.button}>Log in</button>

    //            {error && <strong>{error}</strong> }
    //        </form >
    //    );
    //}


// redux ---------------------------------------------------------------------------------
    public mapStateToProps = (state: IAppState) => {
        console.log(state)
        return {
        }
    };

    public mapDispatchToProps = (dispatch: Dispatch<any>) => ({
        login() { dispatch(authenticationActions.LOGIN({ userName: 'juza' })); }
    });
}