import * as _map from 'lodash/map';
import * as _filter from 'lodash/filter';
import * as _sortBy from 'lodash/sortBy';

// react
import * as React from 'react'

// redux
import { connect } from 'react-redux';
import { Field, reduxForm, initialize, FormProps, SubmissionError } from 'redux-form';
import MenuItem from 'material-ui/MenuItem'
import {
    TextField,
    SelectField
} from 'redux-form-material-ui'

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

    private roles: any;

    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    public componentDidMount() {
        this.getRoleOptions();
    }

    private getRoleOptions() {
        return this.api.getJson(this.props.baseUrl + '/Users/GetRoles')
            .then(data => this.roles = data);
    }

    private menuItems() {
        return _map(this.roles, (role) => (
            <MenuItem
                key={role.name}
                checked={this.roles.isSelected}
                value={role.name}
                primaryText={role.name}
            />
        ));
    }

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
            errorSummary[formError.fieldName ? formError.fieldName : '_error'] = formError.errorMessage;
        }

        return Promise.reject(new SubmissionError(errorSummary));
    }

    public submit(values: any) {
        return this.api.postJson(this.props.baseUrl + '/Users/CreateUser', values)
            .then(this.processResponse.bind(this))
            .catch(this.formatSubmitErrors);
    }

    public render() {
        const { error, handleSubmit, pristine, reset, submitting } = this.props;

        return (
            <form onSubmit={handleSubmit(this.submit)} className={style.container}>

                <Field name="username" id="create-user_username"
                    component={TextField}
                    validate={[Validation.required]}
                    floatingLabelText="Username"
                    floatingLabelFixed={true} />

                <Field name="password" id="create-user_password"
                    component={TextField}
                    validate={[Validation.required]}
                    floatingLabelText="Password"
                    floatingLabelFixed={true} />

                <Field name="confirmPassword" id="create-user_confirmPassword"
                    component={TextField}
                    validate={[Validation.required]}
                    floatingLabelText="Confirm password"
                    floatingLabelFixed={true} />

                <Field name="email" id="create-user_email"
                    component={TextField}
                    validate={[Validation.required]}
                    floatingLabelText="Email"
                    floatingLabelFixed={true} />

                <Field name="roles" id="create-user_roles"
                    component={SelectField}
                    multiple={true}
                    floatingLabelText="Roles"
                    floatingLabelFixed={true}>

                    {this.menuItems()}

                </Field>

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
