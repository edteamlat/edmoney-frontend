"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "../../components/layout/DashboardLayout"
import { transactionsService } from "../../services/transactions.service"
import { usersService } from "@/services/users.service"
import { Transaction } from "../../types/transaction.types"
import TransaccionesTableHeader from "@/components/transacciones/TransaccionesTableHeader"
import TransaccionesTableBody from "@/components/transacciones/TransaccionesTableBody"

const TransaccionesPage = () => {
  const router = useRouter()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const userData = await usersService.me()
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

    fetchTransactions()
  }, [])

  const handleNuevaTransaccion = () => {
    router.push("/transacciones/nueva")
  }

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Transacciones
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Gestiona tus ingresos y egresos
          </p>
        </div>

        <button
          onClick={handleNuevaTransaccion}
          className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-800 flex items-center"
        >
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Nueva Transacción
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-base font-medium text-gray-700 dark:text-gray-300">
            Todas las Transacciones
          </h3>

          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              Filtrar
            </button>
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              Exportar
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="py-16 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              Cargando transacciones...
            </p>
          </div>
        ) : error ? (
          <div className="py-16 text-center">
            <p className="text-red-500 dark:text-red-400">{error}</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <TransaccionesTableHeader />
                <TransaccionesTableBody transactions={transactions} />
              </table>
            </div>

            {transactions.length === 0 && (
              <div className="py-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  No hay transacciones registradas
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  )
}

export default TransaccionesPage
