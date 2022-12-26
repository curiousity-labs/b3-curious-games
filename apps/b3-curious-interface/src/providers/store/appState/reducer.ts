import { AppStateAction, AppStateActions } from './actions';
import { AppState } from './types';
export function reducer(state: AppState, action: AppStateActions) {
  switch(action.type) {
    case AppStateAction.Reset: {
      return state
    }
    default:
      return state;
  }
} 