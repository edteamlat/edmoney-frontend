import { EllipsisVerticalIcon } from "@heroicons/react/24/outline"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import DeleteTransactionModal from "../modals/DeleteTransactionModal"
import PopoverTemplate from "../popovers/PopoverTemplate"
import DeleteTransactionOption from "./DeleteTransactionOption"
import EditTransactionOption from "./EditTransactionOption"
interface TransactionOptionsProps {
  transactionId: string
}

const TransactionOptions = ({ transactionId }: TransactionOptionsProps) => {
  const [deleteTransactionId, setDeleteTransactionId] = useState<string | null>(null)
  const queryClient = useQueryClient()

  const onSuccessDelete = () => {
    // Invalidar las queries relacionadas con transacciones
    queryClient.invalidateQueries({ queryKey: ["RECENT_TRANSACTIONS"] })
  }

  return (
    <>
      <PopoverTemplate
        trigger={<EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />}
        position="top end"
      >
        <EditTransactionOption transactionId={transactionId} />
        <DeleteTransactionOption handleClick={() => setDeleteTransactionId(transactionId)} />
      </PopoverTemplate>
      <DeleteTransactionModal
        transactionId={deleteTransactionId}
        setDeleteTransactionId={setDeleteTransactionId}
        onSuccess={onSuccessDelete}
      />
    </>
  )
}

export default TransactionOptions
