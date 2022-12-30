import { ReactNode, useCallback, useMemo, useReducer } from 'react'
import { StoreContext } from './context'
import { ContractStateAction, ContractStateActions } from './contract/actions'
import { contractInitialState, reducer as contractReducer } from './contract/reducer'
import { useContracts } from './contract/hooks/useContracts'

export function StoreProvider({ children }: { children: ReactNode }) {
  const [contractState, contractDispatch] = useReducer(contractReducer, contractInitialState)
  const dispatch = useCallback(
    (action: ContractStateActions) => {
      switch (action.type) {
        case ContractStateAction.SET_CONTRACTS: {
          return contractDispatch({ ...action })
        }
        default:
          return // do nothing
      }
    },
    [],
  )

  useContracts(dispatch);

  const value = useMemo(
    () => ({
      contracts: contractState,
      dispatch,
    }),
    [dispatch, contractState],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
