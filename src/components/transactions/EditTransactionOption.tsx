import { CloseButton } from "@headlessui/react"
import { PencilIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

interface EditTransactionOptionProps {
  transactionId: string
}

const EditTransactionOption = ({ transactionId }: EditTransactionOptionProps) => {
  return (
    <CloseButton
      as={Link}
      href={`/transacciones/editar/formulario?transaction=${transactionId}`}
      className="group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      <PencilIcon className="mr-2 h-4 w-4" aria-hidden="true" />
      Editar
    </CloseButton>
  )
}

export default EditTransactionOption
