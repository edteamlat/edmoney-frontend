import { useState } from "react"
import { transactionsService } from "../services/transactions.service"
import { useUser } from "../components/layout/DashboardLayout"

export const useDeleteTransaction = () => {
  const [isDeleting, setIsDeleting] = useState(false)
  const { user } = useUser()

  const handleDeleteConfirm = async (transactionId: string) => {
    if (!user) return

    try {
      setIsDeleting(true)

      await transactionsService.remove(transactionId, user.id)

      return true
    } catch (err) {
      console.error("Error deleting transaction:", err)
      throw new Error("No se pudo eliminar la transacción")
    } finally {
      setIsDeleting(false)
    }
  }

  return {
    handleDeleteConfirm,
    isDeleting,
  }
}
