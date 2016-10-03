//react
import * as React from 'react';

// components
import { Header } from './header';
import Navigation from './navigation';
import Content from './content';

// style
import * as style from '../../../../content/component-styles/layout.css';

// component ---------------------------------------------------------------------------------

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