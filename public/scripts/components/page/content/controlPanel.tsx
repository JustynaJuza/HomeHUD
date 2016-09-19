import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as _ from 'lodash';

import { homeHudConfig as config } from "../../HomeHud";

import { IAppState } from '../../../stores/app';
import { ILightSwitchState } from '../../../stores/lights/lightsState';
import { lightActions } from '../../../stores/lights/lightActions';

import { LightSwitch } from './lightSwitch';

import * as style from '../../../../styles/control-panel.css';

interface IControlPanelProps {
    dispatch: Dispatch<any>;
    lights: Array<ILightSwitchState>;
    onSwitchChange: (id : number) => void;
}

export class ControlPanel extends React.Component<IControlPanelProps, {}> {
      private handlers : any;

    constructor(props : IControlPanelProps){
        super(props);
        this.handlers = this.createHandlers(this.props.dispatch);
    }

  private createHandlers(dispatch : Dispatch<any>){
      return {
          onSwitchAllOn: () => dispatch(lightActions.TRY_SET_ALL_LIGHTS_ON()),
          onSwitchAllOff: () => dispatch(lightActions.TRY_SET_ALL_LIGHTS_OFF()),
          onSwitchOn: (id: string | number) => dispatch(lightActions.TRY_SET_LIGHT_ON(id)),
          onSwitchOff: (id: string | number) => dispatch(lightActions.TRY_SET_LIGHT_OFF(id))
      }
  }

  private renderLightSwitch = (entry: ILightSwitchState, index: number) => {
      return (
          <LightSwitch key={index} id={entry.id} state={entry.state}
          onSwitchOn={this.handlers.onSwitchOn}
          onSwitchOff={this.handlers.onSwitchOff}/>
      )
  }

    private renderLightSwitches = () => {
        var groupedByRoom = _.groupBy(this.props.lights, (entry : ILightSwitchState) => entry.roomIndex);
        console.log(groupedByRoom)
    }


    private renderRoom = (switches : Array<ILightSwitchState>) => {
        return _.map(switches, this.renderLightSwitch);
    }

  public render() {
    console.log(this.props.lights)

      return (
          <div className={style.switches}>
            <button onClick={this.handlers.onSwitchAllOn}>Switch all ON</button>
            <button onClick={this.handlers.onSwitchAllOff}>Switch all OFF</button>

            { this.renderLightSwitches() }
          </div>
      );
  }
}

const mapStateToProps = (state: IAppState) => {
    return {
        lights: state.lights.all
    }
};

export default connect(mapStateToProps)(ControlPanel);
