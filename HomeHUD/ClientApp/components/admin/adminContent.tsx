// react
import * as React from 'react'

// redux
import { IRouterParams } from '../../router';

// components
import Nav from './nav';
import ListPanel from './listPanel';

// component ---------------------------------------------------------------------------------

class AdminContent extends React.Component<IRouterParams, {}> {

    private renderSelectedList() {
        var entryName = this.props.params['entryName'];
        if (entryName) {
            return <ListPanel entryName={entryName} />
        }

        return null;
    }


    public render() {
        const { params, location } = this.props;

        return (
            <div>
                <Nav {...{ params, location }} />
                { this.renderSelectedList() }
            </div>
        );
    }
}

export default AdminContent;