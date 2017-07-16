import * as _map from 'lodash/map';
import * as _filter from 'lodash/filter';
import * as _sortBy from 'lodash/sortBy';

// react
import * as React from 'react'

// redux
import { connect } from 'react-redux';
import { IAppState } from '../../state/state';

// redux-form
import { Field, reduxForm, initialize, FormProps, SubmissionError } from 'redux-form';
import { TextField, SelectField } from 'redux-form-material-ui'
import MenuItem from 'material-ui/MenuItem'
import * as Validation from '../../state/form/formValidation';
import { IFormResult, IFormError } from '../../state/form/formResult';
import { Api } from '../../state/api';

// style
import * as style from '../../css/components/login-panel.css';

// component ---------------------------------------------------------------------------------

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

type ICreateUserFormPropsType =
    ICreateUserFormProps
    & FormProps<ICreateUserFormData, void, void>

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
        return this.api.getJson(this.props.baseUrl + '/users/getRoles')
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
                    validate={[Validation.required, Validation.email]}
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
