import { ContractStateAction, ContractStateActions } from './actions';
import { ContractState } from './types';
export function reducer(state: ContractState, action: ContractStateActions) {
  switch(action.type) {
    case ContractStateAction.Reset: {
      return state
    }
    default:
      return state;
  }
} 