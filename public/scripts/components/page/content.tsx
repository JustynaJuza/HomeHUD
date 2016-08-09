import * as React from 'react';
import * as classNames from 'classnames';

import * as style from '../../../styles/layout.css';

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

export { Content };