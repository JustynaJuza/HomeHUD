import * as _map from 'lodash/map';
import * as _filter from 'lodash/filter';
import * as _sortBy from 'lodash/sortBy';

// react
import * as React from 'react'

// redux
import { connect } from 'react-redux';
import { Field, reduxForm, initialize, FormProps, SubmissionError } from 'redux-form';

import { IAppState } from '../../state/state';

import * as Validation from '../../state/formValidation';

import { Api } from '../../state/api';

// style
import * as style from '../../css/components/login-panel.css';

// component ---------------------------------------------------------------------------------

interface CreateUserFormData {
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
    roles: string[];
}

interface ICreateUserFormProps {
    baseUrl: string;
}

type ICreateUserFormPropsType =
    ICreateUserFormProps
    & FormProps<CreateUserFormData, void, void>

class CreateUserForm extends React.Component<ICreateUserFormPropsType, {}> {

    private api: Api = new Api();

    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
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
        this.api.postJson(this.props.baseUrl + '/Users/CreateUser', values)
            .then(this.processResponse.bind(this))
            .catch(this.formatSubmitErrors);
    }

    public render() {
        const { error, handleSubmit, pristine, reset, submitting } = this.props;

        return (
            <form onSubmit={handleSubmit(this.submit)} className={style.container}>

                <Field name="username"
                    component={this.renderField} validate={[Validation.required]} label="Username" />
                <Field name="password"
                    component={this.renderField} validate={[Validation.required]} label="Password" />
                <Field name="confirmPassword"
                    component={this.renderField} validate={[Validation.required]} label="Confirm password" />
                <Field name="email"
                    component={this.renderField} validate={[Validation.required]} label="Email" />
                <Field name="roles"
                    component={this.renderField} validate={[Validation.required]} label="Roles" />

                {error && <span className={style.form_error}>{error}</span>}

                <button type="submit" disabled={pristine || submitting}>Submit</button>

            </form>
        );
    }
}

// redux ---------------------------------------------------------------------------------

const form =
    reduxForm({
        form: 'CreateUserForm'
    })(CreateUserForm);

export default connect(
    (state: IAppState) => ({
        baseUrl: state.request.baseUrl
    }),
    null
)(form);
