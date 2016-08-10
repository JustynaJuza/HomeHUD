import * as React from 'react';
import * as classNames from 'classnames';

import * as style from './../../../styles/navigation-tab.css';

interface INavigationTabProps {
	id: number,
	selectedNavigationTab: number;
	onSelectTab: (id : number) => void;
	hash: string;
}

interface INavigationTabState {
	//isActive: boolean;
}

class NavigationTab extends React.Component<INavigationTabProps, INavigationTabState> {
	// public static defaultProps: INavigationTabProps = {
 //        //isActive: false,
 //        hash: ''
 //    };

	constructor() {
		super();

		// this.state = {
  //           //isActive: false
  //           isActive: this.props.selectedNavigationTab === this.props.id
  //       }

    	//this.activateTab = this.activateTab.bind(this);
    }

    private isActive(){
    	console.log(this.props.selectedNavigationTab, this.props.id);
    	return this.props.selectedNavigationTab === this.props.id;
    }

  //   private activateTab () {
  //   	if (this.state.isActive) return;

		// this.setState({ isActive : true });
		// this.props.onSelectTab(this.props.id);
  //   }

    public render() {
		var tabClasses = classNames(
			style.tab,
			{
				[style.active]: this.isActive()
			})

        return (
			<li className={tabClasses}>
				<a href={`#/${this.props.hash}`} onClick={this.props.onSelectTab.bind(this.props.id)} className={style.link}>
					{this.props.children}
				</a>
			</li>
		);
    }
}

export { NavigationTab };