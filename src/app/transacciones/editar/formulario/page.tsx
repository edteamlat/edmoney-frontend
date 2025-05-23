"use client"

import { TRANSACTION_FORM_MODE } from "@/types/form.types"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import DashboardLayout from "../../../../components/layout/DashboardLayout"
import TransactionForm from "../../nueva/formulario/TransactionForm"

// Create a client
const queryClient = new QueryClient()

const EditTransactionFormPage = () => {
  const searchParams = useSearchParams()
  const transactionId = searchParams.get("transaction")

  if (!transactionId) {
    return (
      <DashboardLayout>
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded">
          No se proporcionó un ID de transacción válido
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Editar Transacción</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Modifica los datos de la transacción según sea necesario
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <QueryClientProvider client={queryClient}>
          <TransactionForm mode={TRANSACTION_FORM_MODE.EDIT} transactionId={transactionId} />
        </QueryClientProvider>
      </div>
    </DashboardLayout>
  )
}

export default EditTransactionFormPage
