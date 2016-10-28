// react
import { Field, reduxForm, SubmissionError } from 'redux-form';
import LoginForm from './login';

// redux
import { connect } from 'react-redux';

// style
import * as style from '../../../../../content/component-styles/login-panel.css';

// component ---------------------------------------------------------------------------------

export const handleLoginFailure = function(formErrors){

    var errorSummary = {};

    for (var i=0; i < formErrors.length; i++){
        var formError = formErrors[i];
        errorSummary[formError.fieldName || '_error'] = formError.errorMessage;
    }
    console.log(errorSummary);
    
    return Promise.reject(new SubmissionError(errorSummary));
}

var loginForm = new LoginForm();

const submit = () => {
    console.log("submit");
    return Promise.reject(new SubmissionError({ username: 'issue here', _error: 'Invalid' }));
}

const validate = values => {
    const errors = {}
    if (!values.username) {
        errors.username = 'Required'
    } else if (values.username.length > 3) {
        errors.username = 'Must be 15 characters or less'
    }

    if (!values.password) {
        errors.password = 'Required'
    }

    return errors
}

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const form = (props) => {
    console.log(props);
    const { error, handleSubmit, pristine, reset, submitting } = props;

    return (
        <form onSubmit= { handleSubmit(submit) } className= { style.container } >
            <div className={style.field}>
                <label className={style.label} htmlFor="username">User</label>
                <Field className={style.input} name="username" type="text" component={renderField} label="Name" />
            </div>
            <div className={style.field}>
                <label className={style.label} htmlFor="password">Password</label>
                <Field className={style.input} name="password" type="password" component={renderField} label="Password" />
            </div>
            <button type="submit" className={style.button}>Log in</button>

            { error && <strong>{error}</strong> }
        </form >
    );
}

// redux ---------------------------------------------------------------------------------

export default
    connect(loginForm.mapStateToProps, loginForm.mapDispatchToProps)(
        reduxForm({
        form: 'login',
        validate: validate
    })
    (form));
