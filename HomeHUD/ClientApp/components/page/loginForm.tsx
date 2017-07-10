import * as _map from 'lodash/map';
import * as _filter from 'lodash/filter';
import * as _sortBy from 'lodash/sortBy';

// react
import * as React from 'react'

// redux
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IAppState } from '../../state/state';

import { requestActionCreators } from '../../state/request/requestActionCreators';

// style
import * as style from '../../css/components/roomNav.css';

// component ---------------------------------------------------------------------------------

type ILoginFormPropsType =
    ILoginFormProps
    & typeof requestActionCreators;

interface ILoginFormProps {
}

class LoginForm extends React.Component<ILoginFormPropsType, {}> {

    private setAuthenticationToken() {
        this.props.logIn('helloToken');
    }

    public render() {
        return (
            <button onClick={() => this.setAuthenticationToken()}>Login form</button>
        );
    }
}

// redux ---------------------------------------------------------------------------------

export default connect(
    null,
    requestActionCreators
)(LoginForm);
