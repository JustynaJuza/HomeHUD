// react
import * as React from 'react'

// redux
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IAppState } from '../../state/state';
import { IRouterParams } from '../../router';
import { browserHistory } from 'react-router';

// style
import * as style from '../../css/components/layout.css';

// component ---------------------------------------------------------------------------------

interface ILoginGuardProps extends IRouterParams {
    isAuthenticated: boolean;
    currentPath: string;
};


class LoginGuard extends React.Component<ILoginGuardProps, {}> {

    public componentDidMount() {
        //const { dispatch, currentURL } = this.props

        if (!this.props.isAuthenticated) {
          //dispatch(setRedirectUrl(currentURL))
          browserHistory.replace("/login")
        }
    }

    public render() {
        return this.props.isAuthenticated
            ? <div> { this.props.children } </div>
            : null;
    }

}

// redux ---------------------------------------------------------------------------------

const mapStateToProps = (state: IAppState, ownProps: ILoginGuardProps) => {
    return {
        isAuthenticated: state.request.isAuthenticated,
        currentPath: ownProps.location.pathname
    }
};

const mapDispatchToProps = (dispatch: Dispatch<any>, publicProps: IRouterParams) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginGuard);