import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { TransactionFormInputs } from "../app/transacciones/nueva/formulario/types"
import { toCreateTransactionDto, toUpdateTransactionDto } from "../helpers/transaction-form"
import { transactionsService } from "../services/transactions.service"
import { Transaction } from "../types/transaction.types"

interface TransactionResult {
  mutate: (data: TransactionFormInputs) => void
  isPending: boolean
}

interface UseCreateTransactionProps {
  setErrorMessage: (error: string) => void
}

interface UseUpdateTransactionProps {
  transactionId: string
  setErrorMessage: (error: string) => void
}

export const useCreateTransaction = ({
  setErrorMessage,
}: UseCreateTransactionProps): TransactionResult => {
  const router = useRouter()

  const { mutate, isPending } = useMutation<Transaction, Error, TransactionFormInputs>({
    mutationFn: async (data: TransactionFormInputs) => {
      const payload = toCreateTransactionDto(data)
      return await transactionsService.create(payload)
    },
    onSuccess: () => {
      router.push("/transacciones")
    },
    onError: (error: Error) => {
      setErrorMessage(
        error?.message || "Error al crear la transacción. Verifica los datos e intenta nuevamente."
      )
    },
  })

  return {
    mutate,
    isPending,
  }
}

export const useUpdateTransaction = ({
  transactionId,
  setErrorMessage,
}: UseUpdateTransactionProps): TransactionResult => {
  const router = useRouter()

  const { mutate, isPending } = useMutation<Transaction, Error, TransactionFormInputs>({
    mutationFn: async (data: TransactionFormInputs) => {
      const payload = toUpdateTransactionDto(data, transactionId)
      return await transactionsService.update(transactionId, payload)
    },
    onSuccess: () => {
      router.push("/transacciones")
    },
    onError: (error: Error) => {
      setErrorMessage(
        error?.message ||
          "Error al actualizar la transacción. Verifica los datos e intenta nuevamente."
      )
    },
  })

  return {
    mutate,
    isPending,
  }
}
