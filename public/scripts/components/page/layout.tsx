import * as React from 'react';
import * as classNames from 'classnames';

import * as style from './../../../styles/layout.css';

interface ILayoutProps {
}

interface ILayoutState {
}

class Layout extends React.Component<ILayoutProps, ILayoutState> {
    public render() {

        return (
            <div className={style.layout}>
                   <Header />
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


interface IHeaderProps {
}

interface IHeaderState {
}

class Header extends React.Component<IHeaderProps, IHeaderState> {
    public render() {

        return (
            <div className={style.header}>
                <span className={style.title}>HomeHUD</span>
                   <Navigation />
               </div>
               );
    }
}

interface INavigationProps {
}

interface INavigationState {
}

class Navigation extends React.Component<INavigationProps, INavigationState> {
    public render() {

        return (
            <ul className={style.list}>
<li className={style.tab}>All</li>
<li className={style.tab}>One</li>
<li className={style.tab}>Two</li>
<li className={style.tab}>Three</li>
</ul>
               );
    }
}

export { Layout, Header, Navigation };

