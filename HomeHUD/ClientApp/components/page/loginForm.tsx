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
import * as FieldRenderer from '../forms/fieldRendering'
import * as Validation from '../forms/validation';
import { IFormResult, IFormError } from '../forms/formResult';
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

        for (var i = 0; i < formErrors.length; i++) {
            var formError = formErrors[i];
            errorSummary[formError.fieldName ? formError.fieldName.toLowerCase() : '_error'] = formError.errorMessage;
        }

        return Promise.reject(new SubmissionError(errorSummary));
    }

    public render() {
        const { error, handleSubmit, pristine, reset, submitting, valid } = this.props;

        return (
            <form onSubmit={handleSubmit(this.submit)} className={style.container}>

                <Field name="username" id="login_username"
                    label="Username"
                    component={FieldRenderer.textField}
                    validate={[Validation.required]} />

                <Field name="password" id="login_password"
                    type="password"
                    label="Password"
                    component={FieldRenderer.textField}
                    validate={[Validation.required]} />

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
        form: 'LoginForm'
    })(LoginForm);

export default connect(
    (state: IAppState) => ({
        baseUrl: state.request.baseUrl
    }),

    requestActionCreators
)(form);
