import * as React from 'react';
import * as style from '../../../../content/component-styles/layout.css';

import { Header } from './header';
import Navigation from './navigation';
import Content from './content';

interface ILayoutProps {
}

export class Layout extends React.Component<ILayoutProps, {}> {

    public render() {

        return (
            <div className={style.layout}>
                <Header />
                <Navigation />
                <Content />
            </div>
        );
    }
}

// <ContentBody ref="contentBodyRef" title={this.state.bodyTitle} summary={this.state.bodySummary}>
//                        <div className={styles.hello}>
//                            <button className={styles.button} onClick={() => this.onButtonClick()}>Say Hello!</button>
//                            <div className={styles.message}>You said hello {this.state.sayHelloCount} time(s)</div>
//                        </div>
//                    </ContentBody>