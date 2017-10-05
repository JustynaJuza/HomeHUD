// react
import * as React from 'react'

// redux
import { IRouterParams } from '../../router';

// component ---------------------------------------------------------------------------------

class AdminNav extends React.Component<IRouterParams, {}> {

    public render() {
        const { params, location } = this.props;

        return (
            <div>
                Nav
            </div>
        );
    }
}

export default AdminNav;