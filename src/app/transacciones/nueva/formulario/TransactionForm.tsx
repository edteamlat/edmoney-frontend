/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useUser } from "../../../../components/layout/DashboardLayout"
import FormCheckbox from "../../../../components/ui/FormCheckbox"
import FormDatePicker from "../../../../components/ui/FormDatePicker"
import FormInput from "../../../../components/ui/FormInput"
import FormSelect from "../../../../components/ui/FormSelect"
import {
  CURRENCIES,
  INPUT_METHODS,
  MOCK_CATEGORIES,
  MOCK_PAYMENT_METHODS,
} from "../../../../constants/mocks"
import { TRANSACTION_TYPES } from "../../../../constants/transactions"
import { getFormButtonCopy } from "../../../../helpers/form-copy"
import { getDefaultValues } from "../../../../helpers/transaction-form"
import {
  useCreateTransaction,
  useUpdateTransaction,
} from "../../../../hooks/useTransactionMutations"
import { transactionsService } from "../../../../services/transactions.service"
import { TransactionFormInputs, transactionFormSchema } from "./types"
import { TRANSACTION_FORM_MODE } from "@/types/form.types"

interface TransactionFormProps {
  mode?: TRANSACTION_FORM_MODE
  transactionId?: string
}

const TransactionForm = ({
  mode = TRANSACTION_FORM_MODE.CREATE,
  transactionId,
}: TransactionFormProps) => {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { user } = useUser()

  const userId = user?.id

  // Fetch transaction data if in edit mode
  const { data: transactionData, isLoading: isLoadingTransaction } = useQuery({
    queryKey: ["transaction", transactionId],
    queryFn: () => transactionsService.findOne(transactionId!, userId!),
    enabled: mode === TRANSACTION_FORM_MODE.EDIT && !!transactionId && !!userId,
  })

  const { mutate: createTransaction, isPending: isCreating } = useCreateTransaction({
    setErrorMessage,
  })
  const { mutate: updateTransaction, isPending: isUpdating } = useUpdateTransaction({
    transactionId: transactionId!,
    setErrorMessage,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<TransactionFormInputs>({
    resolver: zodResolver(transactionFormSchema) as any,
    defaultValues: getDefaultValues(userId, mode, transactionData),
  })

  useEffect(() => {
    if (user?.id) {
      setValue("userId", user.id)
    }
  }, [user])

  useEffect(() => {
    if (transactionData) {
      reset(getDefaultValues(userId, mode, transactionData))
    }
  }, [transactionData])

  const onSubmit = (data: TransactionFormInputs) => {
    setErrorMessage(null)

    try {
      if (!data.inputMethodId || data.inputMethodId === "1") {
        data.inputMethodId = INPUT_METHODS.MANUAL_FORM
      }

      if (!data.userId || data.userId === "1") {
        data.userId = user?.id || ""
      }

      if (mode === TRANSACTION_FORM_MODE.EDIT) {
        updateTransaction(data)
        return
      }

      createTransaction(data)
    } catch (error: any) {
      setErrorMessage(
        error?.errors?.[0]?.message || error?.message || "Error al procesar el formulario"
      )
    }
  }

  const handleCancel = () => {
    router.back()
  }

  if (mode === TRANSACTION_FORM_MODE.EDIT && isLoadingTransaction) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const buttonCopy = getFormButtonCopy(mode, isCreating, isUpdating)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {errorMessage && (
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormSelect
          id="type"
          label="Tipo de transacción"
          options={TRANSACTION_TYPES}
          register={register("type")}
          error={errors.type}
          required
        />

        <FormInput
          id="amount"
          label="Monto"
          type="number"
          placeholder="0.00"
          register={register("amount")}
          error={errors.amount}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormSelect
          id="currency"
          label="Moneda"
          options={CURRENCIES}
          register={register("currency")}
          error={errors.currency}
          required
        />

        <FormDatePicker
          id="transactionDate"
          label="Fecha y hora"
          register={register("transactionDate")}
          error={errors.transactionDate}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormSelect
          id="categoryId"
          label="Categoría"
          options={MOCK_CATEGORIES}
          register={register("categoryId")}
          error={errors.categoryId}
        />

        <FormSelect
          id="paymentMethodId"
          label="Método de pago"
          options={MOCK_PAYMENT_METHODS}
          register={register("paymentMethodId")}
          error={errors.paymentMethodId}
        />
      </div>

      <FormInput
        id="description"
        label="Descripción"
        placeholder="Describe tu transacción"
        register={register("description")}
        error={errors.description}
      />

      <FormCheckbox
        id="isRecurring"
        label="Esta es una transacción recurrente"
        register={register("isRecurring")}
        error={errors.isRecurring}
      />

      <div className="flex items-center justify-end space-x-3 pt-4 border-t dark:border-gray-700">
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isCreating || isUpdating}
          className={`px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-800 disabled:opacity-50 ${
            (isCreating || isUpdating) && "grayscale"
          }`}
        >
          {buttonCopy}
        </button>
      </div>
    </form>
  )
}

export default TransactionForm
