import { AccountStateAction, AccountStateActions } from './actions';
import { IAccountState } from './types';

export function reducer(state: IAccountState, action: AccountStateActions) {
  switch(action.type) {
    case AccountStateAction.Reset: {
      return state
    }
    default:
      return state;
  }
} 