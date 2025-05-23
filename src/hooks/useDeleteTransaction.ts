import { useMutation } from "@tanstack/react-query"
import { useUser } from "../components/layout/DashboardLayout"
import { transactionsService } from "../services/transactions.service"
import { useTimeout } from "./useTimeout"

interface UseDeleteTransactionProps {
  setDeleteTransactionId: (id: string | null) => void
  onSuccess: () => void
}

export const useDeleteTransaction = ({
  setDeleteTransactionId,
  onSuccess,
}: UseDeleteTransactionProps) => {
  const { user } = useUser()
  const { timeoutRef } = useTimeout()

  const { isPending, isSuccess, mutate, isError } = useMutation({
    mutationFn: async (transactionId: string) => {
      if (!user) throw new Error("No user found")
      await transactionsService.remove(transactionId, user.id)
      return true
    },
    onSuccess: () => {
      onSuccess()

      timeoutRef.current = setTimeout(() => {
        setDeleteTransactionId(null)
      }, 1000)
    },
  })

  return {
    isPending,
    isSuccess,
    mutate,
    isError,
  }
}
