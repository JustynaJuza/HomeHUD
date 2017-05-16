//react
import * as React from 'react';

// components
import { Header } from './header';
import Navigation from './navigation';
import Content from './content';
import { Api } from '../../state/api';
//import ConfigMenu from './configMenu';

// style
import * as style from '../../css/components/layout.css';

// component ---------------------------------------------------------------------------------

interface ILayoutProps {
}

export class Layout extends React.Component<{}, {}> {
    private api: Api;

    constructor() {
        super();

        var api = new Api();
        api.getJson("/")
    }

    public render() {

        return (
            <div className={style.layout}>
                <Header />
                <Navigation />
                <Content />
            </div>
        );
    }
    
    //<Header />
    //<Navigation />
    //<Content />
    //<ConfigMenu />
}