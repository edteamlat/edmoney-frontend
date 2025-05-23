/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { transactionFormSchema, TransactionFormInputs } from "./types"
import FormInput from "../../../../components/ui/FormInput"
import FormSelect from "../../../../components/ui/FormSelect"
import FormDatePicker from "../../../../components/ui/FormDatePicker"
import FormCheckbox from "../../../../components/ui/FormCheckbox"
import { transactionsService } from "../../../../services/transactions.service"
import { useState, useEffect } from "react"
import { TransactionType } from "../../../../types/category.types"
import { CreateTransactionDto } from "../../../../types/transaction.types"
import { useUser } from "../../../../components/layout/DashboardLayout"
import {
  INPUT_METHODS,
  MOCK_CATEGORIES,
  MOCK_PAYMENT_METHODS,
  CURRENCIES,
} from "../../../../constants/mocks"
import { TRANSACTION_TYPES } from "../../../../constants/transactions"

const TransactionForm = () => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { user } = useUser()

  const userId = user?.id

  // Obtener la fecha y hora actual en formato ISO para el valor por defecto
  const getCurrentDateTimeString = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, "0")
    const day = String(now.getDate()).padStart(2, "0")
    const hours = String(now.getHours()).padStart(2, "0")
    const minutes = String(now.getMinutes()).padStart(2, "0")

    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  const getDefaultValues = () => {
    return {
      userId: userId, // ID de usuario en formato UUID
      inputMethodId: INPUT_METHODS.MANUAL_FORM, // UUID para método de entrada manual
      type: TransactionType.EXPENSE, // Establecer un valor por defecto
      currency: "USD",
      transactionDate: getCurrentDateTimeString(),
      isRecurring: false,
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<TransactionFormInputs>({
    resolver: zodResolver(transactionFormSchema) as any,
    defaultValues: getDefaultValues(),
  })

  useEffect(() => {
    if (user?.id) {
      setValue("userId", user.id)
    }
  }, [user])

  // Para debug - mostrar valores en tiempo real
  const watchedValues = watch()
  console.log("Valores actuales del formulario:", watchedValues)

  const createTransaction = useMutation({
    mutationFn: async (data: any) => {
      // Convert to API format
      const apiData: CreateTransactionDto = {
        user_id: data.userId,
        category_id: data.categoryId,
        payment_method_id: data.paymentMethodId,
        input_method_id: data.inputMethodId,
        type: data.type,
        amount: data.amount,
        currency: data.currency,
        transaction_date: data.transactionDate,
        description: data.description,
        is_recurring: data.isRecurring,
        recurring_id: data.recurringId,
      }

      console.log("Enviando datos a la API:", apiData)
      try {
        const result = await transactionsService.create(apiData)
        console.log("Respuesta de la API:", result)
        return result
      } catch (error) {
        console.error("Error en la llamada a la API:", error)
        throw error
      }
    },
    onSuccess: () => {
      console.log("Transacción creada exitosamente, redirigiendo...")
      router.push("/transacciones")
    },
    onError: (error: any) => {
      console.error("Error creating transaction:", error)
      setErrorMessage(
        error?.message || "Error al crear la transacción. Verifica los datos e intenta nuevamente."
      )
      setIsSubmitting(false)
    },
  })

  const onSubmit = (data: TransactionFormInputs) => {
    console.log("Formulario enviado con datos:", data)
    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      // Asegurarse de que inputMethodId sea un UUID válido
      if (!data.inputMethodId || data.inputMethodId === "1") {
        data.inputMethodId = INPUT_METHODS.MANUAL_FORM
      }

      // Asegurarse de que userId sea un UUID válido
      if (!data.userId || data.userId === "1") {
        data.userId = user?.id || ""
      }

      // Enviar los datos directamente sin volver a validar con Zod
      // ya que el resolver de react-hook-form ya los validó
      createTransaction.mutate(data)
    } catch (error: any) {
      console.error("Error al procesar el formulario:", error)
      setErrorMessage(
        error?.errors?.[0]?.message || error?.message || "Error al procesar el formulario"
      )
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    router.back()
  }

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
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-800 disabled:opacity-50"
        >
          {isSubmitting ? "Guardando..." : "Guardar Transacción"}
        </button>
      </div>
    </form>
  )
}

export default TransactionForm
