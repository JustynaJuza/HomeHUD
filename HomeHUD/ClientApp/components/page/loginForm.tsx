import * as _map from 'lodash/map';
import * as _filter from 'lodash/filter';
import * as _sortBy from 'lodash/sortBy';

// react
import * as React from 'react'

// redux
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IAppState } from '../../state/state';


// style
import * as style from '../../css/components/roomNav.css';

// component ---------------------------------------------------------------------------------

interface ILoginFormProps {
}

class LoginForm extends React.Component<ILoginFormProps, {}> {

    public render() {
        return (
            <div>Login form</div>
        );
    }
}

// redux ---------------------------------------------------------------------------------

const mapStateToProps = (state: IAppState) => {
    return {
    }
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
