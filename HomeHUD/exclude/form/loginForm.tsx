// react
import { Field, reduxForm, SubmissionError } from 'redux-form';
import loginForm, { LoginForm } from './loginForm.processing';

// redux
import { connect } from 'react-redux';

// style
import * as style from '../../../css/components/login-panel.css';

// component ---------------------------------------------------------------------------------

export const formatSubmitErrors = (formErrors) => {

    var errorSummary = {};

    for (var i=0; i < formErrors.length; i++){
        var formError = formErrors[i];
        errorSummary[formError.fieldName ? formError.fieldName.toLowerCase() : '_error'] = formError.errorMessage;
    }
    
    return Promise.reject(new SubmissionError(errorSummary));
}

//export const resetFields = (form) => {
    
//    form.props.change('password','');
//    form.props.untouch('password');

//}

export const render = (form) => {
    const { error, handleSubmit, pristine, reset, submitting } = form.props;

    return (
        <form onSubmit={handleSubmit(form.submit.bind(form))} className={style.container}>

            <Field className={style.input} name="username" type="text" component={form.renderField} label="Name" />

            <Field className={style.input} name="password" type="password" component={form.renderField} label="Password" />

            { error && <span className={style.form_error}>{error}</span> }

            <button type="submit" disabled={submitting} className={style.button}>Log in</button>

        </form >
    );
}

// redux ---------------------------------------------------------------------------------

export default
        reduxForm({
            form: 'login',
            validate: LoginForm.validate
        })
    (loginForm);
