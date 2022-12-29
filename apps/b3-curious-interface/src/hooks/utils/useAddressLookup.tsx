import { useCallback, useEffect, useMemo, useReducer } from 'react'
import { useProvider } from 'wagmi'
import { addressSubString } from '../../utils/string'
import { isAddress } from 'ethers/lib/utils.js'
import { useAppProvider } from '../../providers/store/context'

export type AddressInfo = {
  full: string | null
  truncated: string | null
  ensName: string | null
  registryDAOName: string | null
  isSafe: boolean
}

const intialAddressState = {
  full: null,
  truncated: null,
  ensName: null,
  registryDAOName: null,
  isSafe: false,
}

enum AddressLookupAction {
  SET_ADDRESS,
  RESET,
}

type AddressLoopupActions =
  | { type: AddressLookupAction.SET_ADDRESS; payload: AddressInfo }
  | { type: AddressLookupAction.RESET }

const reducer = (state: AddressInfo, action: AddressLoopupActions) => {
  switch (action.type) {
    case AddressLookupAction.SET_ADDRESS: {
      return { ...action.payload }
    }
    case AddressLookupAction.RESET: {
      return intialAddressState
    }
    default:
      return state
  }
}

export const useAddressLookup = (_address: string | undefined) => {
  const [addressInfo, addrDispatch] = useReducer(reducer, intialAddressState)
  const provider = useProvider()
  const { contracts } = useAppProvider()

  const displayName = useMemo(() => {
    const { truncated, ensName, registryDAOName } = addressInfo;
    return ensName || registryDAOName || truncated || ''
  }, [addressInfo])

  const lookupAddress = useCallback(async () => {
    if (!_address || !isAddress(_address) || !provider || !contracts.fractal) {
      addrDispatch({ type: AddressLookupAction.RESET })
      return
    }
    const registryContract = contracts.fractal.fractalNameRegistry
    const [ensName, registryDAONameEvent, contractGetCall] = await Promise.all([
      provider.lookupAddress(_address).catch(() => null),
      registryContract.queryFilter(
        registryContract.filters.FractalNameUpdated(_address),
      ),
      contracts.fractal.gnosisSafe
        .attach(_address)
        .getChainId()
        .catch(() => null) // fails if not a Safe
    ]
    )

    const registryDAOName = registryDAONameEvent[0] ? registryDAONameEvent[0].args[1] : null
    const isSafe = !!contractGetCall
    const truncated = addressSubString(_address)

    addrDispatch({
      type: AddressLookupAction.SET_ADDRESS,
      payload: {
        full: _address,
        ensName,
        registryDAOName,
        truncated,
        isSafe,
      },
    })
  }, [provider, _address, contracts.fractal])

  useEffect(() => {
    lookupAddress()
  }, [lookupAddress])

  return { addressInfo, displayName }
}
