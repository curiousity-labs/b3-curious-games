import { SessionStateAction, SessionStateActions } from './actions';
import { SessionState } from './types';
export function reducer(state: SessionState, action: SessionStateActions) {
  switch(action.type) {
    case SessionStateAction.Reset: {
      return state
    }
    default:
      return state;
  }
} 