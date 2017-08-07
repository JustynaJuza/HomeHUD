import * as _map from 'lodash/map';

// react
import * as React from 'react'

// redux
import { connect } from 'react-redux';
import { IAppState } from '../../state/state';

// redux-form
import { Field, reduxForm, initialize, FormProps, SubmissionError } from 'redux-form';
import { MultiSelect, OptionValue } from 'react-selectize';
import { TextField, SelectField } from 'redux-form-material-ui'
import * as FieldRenderer from '../forms/fieldRendering'
import * as Validation from '../forms/validation';
import { IFormResult, IFormError } from '../forms/formResult';
import { Api } from '../../state/api';

// style
import 'react-selectize/themes/index.css'
import * as style from '../../css/components/forms.css';

// component ---------------------------------------------------------------------------------

interface IRole {
    id: number;
    name: string;
}

interface ICreateUserFormData {
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
    roles: string[];
}

interface ICreateUserFormProps {
    baseUrl: string;
}

interface ICreateUserFormState {
    roleOptions: OptionValue[];
}

type ICreateUserFormPropsType =
    ICreateUserFormProps
    & FormProps<ICreateUserFormData, void, void>

class CreateUserForm extends React.Component<ICreateUserFormPropsType, ICreateUserFormState> {

    private api: Api = new Api();

    constructor(props) {
        super(props);
        this.state = { roleOptions: [] };
        this.submit = this.submit.bind(this);
    }

    public componentDidMount() {
        this.getRoleOptions();
    }

    private getRoleOptions() {
        return this.api.getJson<IRole[]>(this.props.baseUrl + '/users/getRoles')
            .then(roles => {
                var roleOptions: OptionValue[] = _map(roles, (role) => ({ label: role.name, value: role.id }));
                this.setState((current) => ({ ...current, roleOptions: roleOptions }))
            });
    }

    public submit(values: ICreateUserFormData) {
        return this.api.postJson(this.props.baseUrl + '/users/createUser', values)
            .then(this.processResponse.bind(this))
            .catch(this.formatSubmitErrors);
    }

    private processResponse(formResult: IFormResult) {
        if (!formResult.success) {
            return Promise.reject(formResult.errors);
        }

        return Promise.resolve();
    }

    private formatSubmitErrors(formErrors: IFormError[]) {
        var errorSummary = {};

        for (var i = 0; i < formErrors.length; i++) {
            var formError = formErrors[i];
            errorSummary[formError.fieldName ? formError.fieldName : '_error'] = formError.errorMessage;
        }

        return Promise.reject(new SubmissionError(errorSummary));
    }

    public render() {
        const { error, valid, handleSubmit, pristine, reset, submitting } = this.props;

        return (
            <form onSubmit={handleSubmit(this.submit)} className={style.container}>

                <Field name="username" id="create-user_username"
                    label="Username"
                    component={FieldRenderer.textField}
                    validate={[Validation.required]} />

                <Field name="password" id="create-user_password"
                    label="Password"
                    component={FieldRenderer.textField}
                    validate={[Validation.required]} />

                <Field name="confirmPassword" id="create-user_confirmPassword"
                    label="Confirm password"
                    component={FieldRenderer.textField}
                    validate={[Validation.required]} />

                <Field name="email" id="create-user_email"
                    label="Email"
                    component={FieldRenderer.textField}
                    validate={[Validation.required, Validation.email]} />

                <MultiSelect name="roles"
                    className={style.multiselect}
                    options={this.state.roleOptions} />

                {error && <span className={style._error}>{error}</span>}

                <button
                    type="submit"
                    disabled={pristine || !valid || submitting}
                    className={style.button}>
                    Submit
                </button>

            </form>
        );
    }
}

// redux ---------------------------------------------------------------------------------

const form =
    reduxForm({
        form: 'CreateUserForm',
        validate: Validation.validate(
            Validation.compare('password', 'confirmPassword'))
    })(CreateUserForm);

export default connect(
    (state: IAppState) => ({
        baseUrl: state.request.baseUrl
    }),
    null
)(form);
