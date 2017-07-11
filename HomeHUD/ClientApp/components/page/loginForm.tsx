import * as _map from 'lodash/map';
import * as _filter from 'lodash/filter';
import * as _sortBy from 'lodash/sortBy';

// react
import * as React from 'react'

// redux
import { connect } from 'react-redux';
import { Field, reduxForm, initialize, FormProps, SubmissionError } from 'redux-form';

import { IAppState } from '../../state/state';
import { requestActionCreators } from '../../state/request/requestActionCreators';

import * as Validation from '../../state/formValidation';

import { Api } from '../../state/api';

// style
import * as style from '../../css/components/login-panel.css';

// component ---------------------------------------------------------------------------------

interface FormData {
    username: string;
    password: string;
}

interface ILoginFormProps {
    baseUrl: string;
}

type ILoginFormPropsType =
    ILoginFormProps
    & FormProps<FormData, void, void>
    & typeof requestActionCreators;

class LoginForm extends React.Component<ILoginFormPropsType, {}> {

    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    private api: Api = new Api();

    private setAuthenticationToken() {
        this.props.logIn('helloToken');
    }

    private renderField = ({ input, label, type, meta: { touched, error, warning }, placeholder }) => (
        <div>
            <label>{label}</label>
            <div>
                <input {...input} placeholder={placeholder} type={type} />
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    )

    public processResponse(formResult: any) {
        if (formResult.success) {
            this.setAuthenticationToken();
            return Promise.resolve();
        }

        return Promise.reject(formResult.errors);
    }

    private formatSubmitErrors(formErrors) {

        var errorSummary = {};

        for (var i=0; i < formErrors.length; i++){
            var formError = formErrors[i];
            errorSummary[formError.fieldName ? formError.fieldName.toLowerCase() : '_error'] = formError.errorMessage;
        }

        return Promise.reject(new SubmissionError(errorSummary));
    }

    public submit(values: any) {
        this.api.postJson(this.props.baseUrl + '/Account/Login', values)
            .then(this.processResponse.bind(this))
            .catch(this.formatSubmitErrors);
    }

    public render() {
        const { error, handleSubmit, pristine, reset, submitting } = this.props;

        return (
            <form onSubmit={handleSubmit(this.submit)} className={style.container}>

                <Field name="username"
                    component={this.renderField} validate={[Validation.required]} placeholder="Username" label="Name" />
                <Field name="password" type="password"
                    component={this.renderField} validate={[Validation.required]} placeholder="Secret stuff" label="Password" />

                {error && <span className={style.form_error}>{error}</span>}

                <button type="submit" disabled={pristine || submitting}>Submit</button>
                <button onClick={() => this.setAuthenticationToken()}>Login form</button>

            </form>
        );
    }
}

// redux ---------------------------------------------------------------------------------

const form =
    reduxForm({
        form: 'LoginForm'
    })(LoginForm);

export default connect(
    (state: IAppState) => ({
        baseUrl: state.request.baseUrl
    }),

    requestActionCreators
)(form);
