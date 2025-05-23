import { useMutation } from "@tanstack/react-query"
import { useUser } from "../components/layout/DashboardLayout"
import { transactionsService } from "../services/transactions.service"

interface UseDeleteTransactionProps {
  onSuccess?: () => void
  onError?: () => void
}

export const useDeleteTransaction = ({ onSuccess, onError }: UseDeleteTransactionProps) => {
  const { user } = useUser()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (transactionId: string) => {
      if (!user) throw new Error("No user found")
      await transactionsService.remove(transactionId, user.id)
    },
    onSuccess: () => {
      if (onSuccess) onSuccess()
    },
    onError: () => {
      if (onError) onError()
    },
  })

  return {
    handleDeleteConfirm: mutateAsync,
    isDeleting: isPending,
  }
}
