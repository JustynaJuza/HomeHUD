import * as React from 'react';
//import * as ReactDOM from 'react-dom';

//ReactDOM.render(
//    <App />,
//    document.getElementById('page')
//)

interface IAppProps {
    a: string;
}

class App extends React.Component<IAppProps, {}> {

    public render() {
        return (
            <div>
                Hello, {this.props.a}!
            </div>
        );
    }
}

//ReactDOM.render(<App a="World" />, document.getElementById('content'));