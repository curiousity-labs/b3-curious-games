import { ReactNode, useCallback, useMemo, useReducer } from 'react'
import { StoreContext } from './context'
import { AccountStateActions } from './account/actions'
import { ContractStateAction, ContractStateActions } from './contract/actions'
import { SessionStateActions } from './session/actions'
import { contractInitialState, reducer as contractReducer } from './contract/reducer'
import { useContracts } from './contract/hooks/useContracts'
// import { reducer as accountReducer } from './account/reducer';
// import { reducer as sessionReducer } from './session/reducer';

export function StoreProvider({ children }: { children: ReactNode }) {
  // contracts should load first --readOnly
  const [contractState, contractDispatch] = useReducer(contractReducer, contractInitialState)

  // account information should second
  // const [accountState, accountDispatch] = useReducer(accountReducer, [])
  // session store should be updated as needed
  // const [sessionState, sessionDispatch] = useReducer(sessionReducer, [])

  const dispatch = useCallback(
    (action: AccountStateActions | ContractStateActions | SessionStateActions) => {
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
      loaders: [],
      dispatch,
    }),
    [dispatch, contractState],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
