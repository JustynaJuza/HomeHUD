// react
import * as React from 'react'
import * as classNames from 'classnames';

// redux
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IAppState } from '../../state/store';
import { navigationActions } from '../../state/navigation/navigationActions';

// style
import * as style from '../../css/components/navigation-tab.css';

// component ---------------------------------------------------------------------------------

interface INavigationTabPublicProps {
    id: number;
    hash: string;
    isActive: boolean;
}

interface INavigationTabProps extends INavigationTabPublicProps {
    onSelectTab: (e: any, id: number) => void;
}

export class NavigationTab extends React.Component<INavigationTabProps, {}> {

    public render() {
        var tabClasses = classNames({
                [style.tab]: true,
                [style.active]: this.props.isActive
            })

        return (
            <li className={tabClasses}>
                <a href={`/${this.props.hash}`} onClick={(e) => this.props.onSelectTab(e, this.props.id)} className={style.link}>
                    <span className={style.name}>
                        {this.props.children}
                    </span>
                </a>
            </li>
        );
    }
}

// redux ---------------------------------------------------------------------------------

const mapStateToProps = (state: IAppState, publicProps: INavigationTabPublicProps) => {
    return {};
};

const mapDispatchToProps = (dispatch: Dispatch<any>, publicProps: INavigationTabPublicProps) => ({
    onSelectTab(e: any, id: number) {
        e.preventDefault();
        history.pushState(null, null, publicProps.hash);

        dispatch(navigationActions.UPDATE_ROUTE(publicProps.hash));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationTab);
