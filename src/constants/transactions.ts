import { TransactionType } from "../types/category.types"

export const TRANSACTION_TYPES = [
  { value: TransactionType.INCOME, label: "Ingreso" },
  { value: TransactionType.EXPENSE, label: "Gasto" },
  { value: TransactionType.TRANSFER, label: "Transferencia" },
]
