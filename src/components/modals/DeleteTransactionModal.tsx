import { useTimeout } from "@/hooks/useTimeout"
import { DialogTitle } from "@headlessui/react"
import { useEffect, useState } from "react"
import { useDeleteTransaction } from "../../hooks/useDeleteTransaction"
import ModalTemplate from "./ModalTemplate"
import SuccessMessage from "./SuccessMessage"

interface DeleteTransactionModalProps {
  transactionId: string | null
  setDeleteTransactionId: (id: string | null) => void
  onSuccess: () => void
}

const DeleteTransactionModal = ({
  transactionId,
  onSuccess,
  setDeleteTransactionId,
}: DeleteTransactionModalProps) => {
  const [isSuccess, setIsSuccess] = useState(false)
  const { timeoutRef } = useTimeout()

  const handleSuccess = () => {
    setIsSuccess(true)
    onSuccess()

    timeoutRef.current = setTimeout(() => {
      setIsSuccess(false)
      setDeleteTransactionId(null)
    }, 1000)
  }

  const { handleDeleteConfirm, isDeleting } = useDeleteTransaction({
    onSuccess: handleSuccess,
  })

  // Reset success state when transactionId changes
  useEffect(() => {
    setIsSuccess(false)
  }, [transactionId])

  const handleConfirm = async () => {
    if (!transactionId) return

    handleDeleteConfirm(transactionId)
  }
  return (
    <ModalTemplate isOpen={!!transactionId} onClose={() => setDeleteTransactionId(null)}>
      {isSuccess && <SuccessMessage />}
      {!isSuccess && (
        <>
          <DialogTitle as="h3" className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Eliminar transacción
          </DialogTitle>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            ¿Estás seguro de que deseas eliminar esta transacción? Esta acción no se puede deshacer.
          </p>
          <div className="flex justify-end space-x-3 mt-4">
            <button
              type="button"
              onClick={() => setDeleteTransactionId(null)}
              disabled={isDeleting}
              className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 dark:bg-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={isDeleting}
              className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:opacity-50"
            >
              {isDeleting ? "Eliminando..." : "Eliminar"}
            </button>
          </div>
        </>
      )}
    </ModalTemplate>
  )
}

export default DeleteTransactionModal
