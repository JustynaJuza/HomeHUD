// react
import React from 'react';
import { Field, reduxForm } from 'redux-form';

// style
import * as style from '../../../../../content/component-styles/login-panel.css';

// component ---------------------------------------------------------------------------------

const LoginForm = {
    validate: values => {
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
    },
    render: (props) => {
        const { handleSubmit, pristine, reset, submitting } = props;
        return (
            <form onSubmit={handleSubmit} className={style.container}>
                <div className={style.field}>
            <label className={style.label} htmlFor="username">User</label>
                <Field className={style.input} name="username" type="text" component="input" label="Name" />
                </div>
                <div className={style.field}>
                <label className={style.label} htmlFor="password">Password</label>
                    <Field className={style.input} name="password" type="password" component="input" label="Password" />
                    </div>
                <button type="submit" className={style.button}>Log in</button>
</form>
            );
            }
            }

            // redux ---------------------------------------------------------------------------------

            export default reduxForm({
            form: 'login',
            validate: LoginForm.validate
            })(LoginForm.render)
