/* eslint-disable camelcase */
import { Transaction } from "../types/transaction.types"
import { TransactionFormInputs } from "../app/transacciones/nueva/formulario/types"
import { TransactionType } from "../types/category.types"
import { INPUT_METHODS } from "../constants/mocks"
import { getCurrentDateTimeString } from "./date"

/**
 * Get default values for the transaction form
 */
export const getDefaultValues = (
  userId: string | undefined,
  mode: "create" | "edit",
  transactionData?: Transaction
): TransactionFormInputs => {
  if (mode === "edit" && transactionData) {
    return {
      userId: transactionData.user_id,
      categoryId: transactionData.category_id,
      paymentMethodId: transactionData.payment_method_id,
      inputMethodId: transactionData.input_method_id,
      type: transactionData.type,
      amount: transactionData.amount.toString(),
      currency: transactionData.currency,
      transactionDate: new Date(transactionData.transaction_date).toISOString().slice(0, 16),
      description: transactionData.description,
      isRecurring: transactionData.is_recurring,
      recurringId: transactionData.recurring_id,
    }
  }

  return {
    userId: userId || "",
    inputMethodId: INPUT_METHODS.MANUAL_FORM,
    type: TransactionType.EXPENSE,
    currency: "USD",
    transactionDate: getCurrentDateTimeString(),
    isRecurring: false,
    amount: "0",
  }
}

/**
 * Convert form data to API format for creating a transaction
 */
export const toCreateTransactionDto = (data: TransactionFormInputs) => ({
  user_id: data.userId,
  category_id: data.categoryId,
  payment_method_id: data.paymentMethodId,
  input_method_id: data.inputMethodId,
  type: data.type,
  amount: data.amount,
  currency: data.currency,
  transaction_date: new Date(data.transactionDate),
  description: data.description,
  is_recurring: data.isRecurring,
  recurring_id: data.recurringId,
})

/**
 * Convert form data to API format for updating a transaction
 */
export const toUpdateTransactionDto = (data: TransactionFormInputs, transactionId: string) => ({
  id: transactionId,
  user_id: data.userId,
  category_id: data.categoryId,
  payment_method_id: data.paymentMethodId,
  input_method_id: data.inputMethodId,
  type: data.type,
  amount: data.amount,
  currency: data.currency,
  transaction_date: new Date(data.transactionDate),
  description: data.description,
  is_recurring: data.isRecurring,
  recurring_id: data.recurringId,
})
