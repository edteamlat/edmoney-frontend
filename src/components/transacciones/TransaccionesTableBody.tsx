import React from "react"
import { Transaction } from "../../types/transaction.types"
import { formatCategoryName } from "@/helpers/format-category-name.helper"

interface TransaccionesTableBodyProps {
  transactions: Transaction[]
  handleDelete: (transactionId: string) => Promise<void>
}

const TransaccionesTableBody = ({
  transactions,
  handleDelete,
}: TransaccionesTableBodyProps) => {
  return (
    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
      {transactions.map((transaction) => (
        <tr key={transaction.id}>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {transaction.description || "Sin descripción"}
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {formatCategoryName(transaction.category_id)}
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(transaction.transaction_date).toLocaleDateString()}
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div
              className={`text-sm font-medium ${
                transaction.type === "income"
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {transaction.type === "income" ? "+" : "-"}$
              {Math.abs(transaction.amount).toFixed(2)} {transaction.currency}
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mr-3">
              Editar
            </button>
            <button
              className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 cursor-pointer"
              onClick={() => handleDelete(transaction.id)}
            >
              Eliminar
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  )
}

export default TransaccionesTableBody
