import * as React from 'react';

interface IAppProps {
    a: string;
}

export class App extends React.Component<IAppProps, {}> {

    public render() {
        return (
            <div>
                Hello, {this.props.a}!
            </div>
        );
    }
}