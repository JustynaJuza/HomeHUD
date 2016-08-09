import { TabAction, TabActions, TabActionHandlers } from './actions/navigationActions'
import * as _ from 'lodash';

const initialState = {};

export default function tabReducer(state = initialState, action: TabAction) {

  let action = TabActions[actionName].;

  if (action) {

    let handler = _.find(TabActionHandlers, (entry) => entry.name === actionName);
    if (handler) {
      handler.handler(state, action);
    }
  }
  return state;
}