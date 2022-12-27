import { FractalContracts, B3Contracts } from './types'

export enum ContractStateAction {
  SET_CONTRACTS,
}

export type ContractStateActions = {
  type: ContractStateAction.SET_CONTRACTS
  payload: { fractal: FractalContracts; b3Curious: B3Contracts }
}
