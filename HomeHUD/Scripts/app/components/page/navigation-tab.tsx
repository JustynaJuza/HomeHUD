// react
import * as React from 'react'
import * as classNames from 'classnames';

// redux
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IAppState } from '../../state/app';
import { navigationActions } from '../../state/navigation/navigationActions';

// style
import * as style from '../../../../content/component-styles/navigation-tab.css';

// component ---------------------------------------------------------------------------------

interface INavigationTabPublicProps {
    id: number;
    hash: string;
}

interface INavigationTabProps extends INavigationTabPublicProps {
    isActive: boolean;
    onSelectTab: (id : number) => void;
}

export class NavigationTab extends React.Component<INavigationTabProps, {}> {

    public render() {
        var tabClasses = classNames({
                [style.tab]: true,
                [style.active]: this.props.isActive
            })

        return (
            <li className={tabClasses}>
                <a href={`#${this.props.hash}`} onClick={() => this.props.onSelectTab(this.props.id)} className={style.link}>
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
    return {
        isActive: state.navigation.selectedNavigationTab === publicProps.id
    }
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    onSelectTab(id: number) { dispatch(navigationActions.SELECT_NAVIGATION_TAB(id)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationTab);
