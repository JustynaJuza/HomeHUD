import * as _map from 'lodash/map';
import * as _filter from 'lodash/filter';
import * as _sortBy from 'lodash/sortBy';

// react
import * as React from 'react'

// redux
import { connect } from 'react-redux';
import { IAppState } from '../../state/state';
import { requestActionCreators } from '../../state/request/requestActionCreators';

// redux-form
import { Field, reduxForm, initialize, FormProps, SubmissionError } from 'redux-form';
import { TextField } from 'material-ui';
import * as Validation from '../../state/form/formValidation';
import { IFormResult, IFormError } from '../../state/form/formResult';
import { IUser } from '../../state/request/requestState';
import { Api } from '../../state/api';

// style
import * as style from '../../css/components/forms.css';

// component ---------------------------------------------------------------------------------

interface ILoginFormData {
    username: string;
    password: string;
}

interface ILoginFormResult extends IFormResult {
    user: IUser;
}

interface ILoginFormProps {
    baseUrl: string;
}

type ILoginFormPropsType =
    ILoginFormProps
    & FormProps<ILoginFormData, void, void>
    & typeof requestActionCreators;

class LoginForm extends React.Component<ILoginFormPropsType, {}> {

    private api: Api = new Api();

    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    public renderTextField({
  input,
        label,
        meta: { touched, error }, hintText,
        ...custom
}) {
        return (
            <TextField
                hintText={hintText}
                floatingLabelText={label}
                errorText={touched && error}
                {...input}
                {...custom}
            />)
    }

    public submit(values: ILoginFormData) {
        return this.api.postJson(this.props.baseUrl + '/account/login', values)
            .then(this.processResponse.bind(this))
            .catch(this.formatSubmitErrors);
    }

    private processResponse(formResult: ILoginFormResult) {
        if (!formResult.success) {
            return Promise.reject(formResult.errors);
        }

        this.props.logIn(formResult.user, null);
        return Promise.resolve();
    }

    private formatSubmitErrors(formErrors: IFormError[]) {
        var errorSummary = {};

        for (var i=0; i < formErrors.length; i++){
            var formError = formErrors[i];
            errorSummary[formError.fieldName ? formError.fieldName.toLowerCase() : '_error'] = formError.errorMessage;
        }

        return Promise.reject(new SubmissionError(errorSummary));
    }

    public render() {
        const { error, handleSubmit, pristine, reset, submitting } = this.props;

        return (
            <form onSubmit={handleSubmit(this.submit)} className={style.container}>

                <Field name="username" id="login_username"
                    component={this.renderTextField}
                    inputStyle={style.input}
                    underlineStyle={style.fieldUnderline}
                    floatingLabelStyle={{ color: 'red' }}
                    validate={[Validation.required]}
                    floatingLabelText="Username"
                    floatingLabelFixed={true}/>

                <Field name="password" id="login_password"
                    className={style.field}
                    component={this.renderTextField}
                    type="password"
                    validate={[Validation.required]}
                    floatingLabelText="Password"
                    floatingLabelFixed={true} />

                {error && <span className={style.form_error}>{error}</span>}

                <button type="submit" disabled={pristine || submitting}>Submit</button>

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
