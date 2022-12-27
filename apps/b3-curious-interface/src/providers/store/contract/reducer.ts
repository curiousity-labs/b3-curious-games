import { ContractStateAction, ContractStateActions } from './actions';
import { ContractState } from './types';

export const contractInitialState: ContractState = {
  fractal: null,
  b3Contracts: null,
}

export function reducer(state: ContractState, action: ContractStateActions) {
  switch (action.type) {
    case ContractStateAction.SET_CONTRACTS: {
      return { ...state, ...action.payload }
    }
    default:
      return state;
  }
} 