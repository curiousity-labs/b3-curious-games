import { useCallback, useEffect, useReducer } from 'react'
import { useProvider } from 'wagmi'
import { addressSubString } from '../../utils/string'
import { isAddress } from 'ethers/lib/utils.js'

type AddresInfo = {
  full: string | null,
  truncated: string | null,
  ensName: string | null,
  registryDAOName: string | null,
}

const intialAddressState = {
  full: null,
  truncated: null,
  ensName: null,
  registryDAOName: null,
}


enum AddressLookupAction {
  SET_ADDRESS,
}

type AddressLoopupActions = { type: AddressLookupAction.SET_ADDRESS, payload: AddresInfo }

const reducer = (state: AddresInfo, action: AddressLoopupActions) => {
  switch (action.type) {
    case AddressLookupAction.SET_ADDRESS: {
      return { ...action.payload }
    }
    default:
      return state
  }
}

export const useAddressLookup = (_address: string | undefined ) => {
  const [addressInfo, addrDispatch] = useReducer(reducer, intialAddressState);
  const provider = useProvider()


  const lookupAddress = useCallback(async () => {
    if (!_address || !isAddress(_address) || !provider) {
      return;
    }
    const ensName = await provider.lookupAddress(_address).catch(() => null);
    const registryDAOName = null; // @todo add Fractal contracts to look this up.
    const truncated = addressSubString(_address);

    addrDispatch({
      type: AddressLookupAction.SET_ADDRESS,
      payload: {
        full: _address, ensName, registryDAOName, truncated
      }
    })

  }, [provider, _address])

  useEffect(() => {
    lookupAddress()
  }, [lookupAddress])

  return { addressInfo }

}
