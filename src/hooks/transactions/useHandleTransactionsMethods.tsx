import { transactionsService, usersService } from "@/services"
import { Transaction, User } from "@/types"
import { useState, useEffect } from "react"

export const useHandleTransactionsMethods = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [userData, setUserData] = useState<User | null>(null)

  useEffect(() => {
    // TODO Add userProvider for get user data
    const getUserData = async () => {
      try {
        const data = await usersService.me()
        setUserData(data)
      } catch (err) {
        console.error("Error obteniendo datos de usuario:", err)
        setError("No se pudieron cargar los datos del usuario")
      }
    }
    getUserData()
  }, [])

  useEffect(() => {
    if (userData) {
      fetchTransactions()
    }
  }, [userData])

  const fetchTransactions = async () => {
    if (!userData) return

    try {
      setIsLoading(true)
      const userId = userData.id
      const data = await transactionsService.findAll(userId)
      setTransactions(data)
    } catch (err) {
      console.error("Error fetching transactions:", err)
      setError("No se pudieron cargar las transacciones")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (transactionId: string) => {
    if (!userData) return

    const isConfirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar esta transacción?",
    )

    if (!isConfirmed) return

    try {
      setIsLoading(true)
      const userId = userData.id
      await transactionsService.remove(transactionId, userId)
      await fetchTransactions()
    } catch (error) {
      console.error("Error al eliminar la transacción:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    transactions,
    isLoading,
    error,
    fetchTransactions,
    handleDelete,
  }
}
