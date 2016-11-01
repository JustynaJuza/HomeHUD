// react
import { Field, reduxForm, SubmissionError } from 'redux-form';
import LoginForm from './loginForm.processing';

// redux
import { connect } from 'react-redux';

// style
import * as style from '../../../../../content/component-styles/login-panel.css';

// component ---------------------------------------------------------------------------------

var loginForm = new LoginForm();

export const formatSubmitErrors = (formErrors) => {

    var errorSummary = {};

    for (var i=0; i < formErrors.length; i++){
        var formError = formErrors[i];
        errorSummary[formError.fieldName ? formError.fieldName.toLowerCase() : '_error'] = formError.errorMessage;
    }

    return Promise.reject(new SubmissionError(errorSummary));
}

const form = (props) => {
    const { error, handleSubmit, pristine, reset, submitting } = props;

    return (
        <form onSubmit={handleSubmit(loginForm.submit.bind(loginForm))} className={style.container}>

            <Field className={style.input} name="username" type="text" component={loginForm.renderField} label="Name" />

            <Field className={style.input} name="password" type="password" component={loginForm.renderField} label="Password" />

            { error && <span className={style.form_error}>{error}</span> }

            <button type="submit" disabled={submitting} className={style.button}>Log in</button>

        </form >
    );
}

// redux ---------------------------------------------------------------------------------

export default
        reduxForm({
            form: 'login',
            validate: loginForm.validate
        })
    (connect(loginForm.mapStateToProps, loginForm.mapDispatchToProps)(form));
