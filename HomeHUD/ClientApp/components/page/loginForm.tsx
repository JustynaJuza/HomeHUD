import * as _map from 'lodash/map';
import * as _filter from 'lodash/filter';
import * as _sortBy from 'lodash/sortBy';

// react
import * as React from 'react'

// redux
import { connect } from 'react-redux';
import { Field, reduxForm, initialize, FormProps } from 'redux-form';

import { IAppState } from '../../state/state';
import { requestActionCreators } from '../../state/request/requestActionCreators';

import * as Validation from '../../state/formValidation';

// style
import * as style from '../../css/components/login-panel.css';

// component ---------------------------------------------------------------------------------

interface FormData {
    username: string;
    password: string;
}

interface ILoginFormProps {
}

type ILoginFormPropsType =
    ILoginFormProps
    & FormProps<FormData, void, void>
    & typeof requestActionCreators;

class LoginForm extends React.Component<ILoginFormPropsType, {}> {

    private setAuthenticationToken() {
        this.props.logIn('helloToken');
    }

    private renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
        <div>
            <label>{label}</label>
            <div>
                <input {...input} placeholder={label} type={type} />
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    )

    private submit(values: any) {
        //return this.api.postJson('/Home/Login', values)
        //    .then(this.processResponse.bind(this))
        //    .catch(formatSubmitErrors);
    }

    public render() {
        const { error, handleSubmit, pristine, reset, submitting } = this.props;

        return (
            <form onSubmit={handleSubmit(this.submit.bind(this))} className={style.container}>

                <Field name="username" component={this.renderField} validate={[Validation.required]} hintText="Username" />
                <Field name="password" type="password" component={this.renderField} hintText="Password" />
                <button type="submit" disabled={pristine || submitting}>Submit</button>
                <button onClick={() => this.setAuthenticationToken()}>Login form</button>

            </form>
        );
    }
}

// redux ---------------------------------------------------------------------------------

export default connect(
    null,
    requestActionCreators
)(LoginForm);


const form = reduxForm({
    form: 'LoginForm'
});