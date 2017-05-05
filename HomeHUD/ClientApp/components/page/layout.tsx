//react
import * as React from 'react';

// components
//import { Header } from './header';
import Navigation from './navigation';
//import Content from './content';
//import ConfigMenu from './configMenu';

// style
import * as style from '../../css/components/layout.css';

// component ---------------------------------------------------------------------------------

interface ILayoutProps {
}

export class Layout extends React.Component<{}, {}> {

    public render() {

        return (
            <div className={style.layout}>
                <Navigation />
            </div>
        );
    }
    
    //<Header />
    //<Navigation />
    //<Content />
    //<ConfigMenu />
}