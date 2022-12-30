import { ContractReceipt, ethers } from 'ethers'
import { useCallback, useRef, useState } from 'react'
import { Id, toast } from 'react-toastify'

interface ProviderRpcError extends Error {
  message: string
  code: number
  data?: any
}

interface ContractCallParams {
  contractFn: () => Promise<ethers.ContractTransaction>
  pendingMessage: string
  failedMessage: string
  successMessage: string
  failedCallback?: () => void
  successCallback?: (txReceipt: ContractReceipt) => void
  completedCallback?: () => void
}

const useTransaction = () => {
  const [pending, setPending] = useState(false)
  const toastRef = useRef<Id | null>(null);

  const contractCall = useCallback(
    async (params: ContractCallParams) => {
      const {
        contractFn,
        pendingMessage,
        failedMessage,
        successMessage,
        failedCallback,
        successCallback,
        completedCallback,
      } = params

      // shows toast and sets pending state
      toastRef.current = toast(pendingMessage, {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
        progress: 1,
      })
      setPending(true)

      try {

        const txResponse = await contractFn()
        const txReceipt = await txResponse.wait()

        toast.dismiss(toastRef.current)

        if (txReceipt.status === 0) {
          toast.error(failedMessage);
          if (failedCallback) {
            failedCallback();
          }
        } else if (txReceipt.status === 1) {
          toast(successMessage);
          if (successCallback) {
            successCallback(txReceipt)
          };
        } else {
          toast.error('Transaction Reverted');
          if (failedCallback) {
            failedCallback();
          }
        }
        if (completedCallback) {
          completedCallback();
        }

        // Give the block event emitter a couple seconds to play the latest
        // block on the app state, before informing app that the transaction
        // is completed.
        setTimeout(() => {
          setPending(false);
        }, 2000);
      } catch (e) {
        const error = e as ProviderRpcError;
        toast.dismiss(toastRef.current);
        setPending(false);
        if (error.code === 4001) {
          toast.error('User Rejected');
          return;
        }
        toast.error('Unknown Error');
      }
    },
    [],
  )

  return [contractCall, pending] as const;
}



export { useTransaction }
