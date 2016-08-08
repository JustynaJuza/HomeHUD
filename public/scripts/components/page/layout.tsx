import * as React from 'react';
import * as classNames from 'classnames';

import * as style from './../../../styles/layout.css';
import { Header } from './header';
import { Navigation } from './navigation';


interface ILayoutProps {
}

interface ILayoutState {
}

class Layout extends React.Component<ILayoutProps, ILayoutState> {
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

interface IContentProps {
}

interface IContentState {
}

class Content extends React.Component<IContentProps, IContentState> {
    public render() {

        return (
            <div className={style.content}>
            </div>
      );
    }
}

export { Layout };