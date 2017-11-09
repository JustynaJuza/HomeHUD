// react
import * as React from 'react'

// redux
import { connect } from 'react-redux';
import { IAppState } from '../../state/state';
import { IRouterParams } from '../../router';
import { browserHistory } from 'react-router';
import { requestActionCreators } from '../../state/request/requestActionCreators';

// style
import * as style from '../../css/components/layout.css';


// component ---------------------------------------------------------------------------------

type LoginGuardPropsType =
    ILoginGuardProps
    & IRouterParams
    & typeof requestActionCreators;

interface ILoginGuardProps {
    isAuthenticated: boolean;
    currentPath: string;
};

class LoginGuard extends React.Component<LoginGuardPropsType, {}> {

    public componentDidMount() {
        if (!this.props.isAuthenticated) {
            this.props.setLoginRedirectUrl(this.props.currentPath);
            browserHistory.replace('/login');
        }
    }

    public render() {
        return this.props.isAuthenticated
            ? React.Children.only(this.props.children)
            : null;
    }

}

// redux ---------------------------------------------------------------------------------

export default connect(
    (state: IAppState, ownProps: LoginGuardPropsType) => ({
        isAuthenticated: state.request.isAuthenticated,
        currentPath: ownProps.location.pathname
    }),

    requestActionCreators
)(LoginGuard);