import * as React from 'react';
import * as classNames from 'classnames';

import * as style from '../../../styles/layout.css';

interface IContentProps {
    selectedNavigationTab: number;
}

export class Content extends React.Component<IContentProps, {}> {

    public render() {
    	// if(selectedNavigationTab === 0){
    	// 	var content =
    	// }

        return (
            <div className={style.content}>
            </div>
        );
    }
}