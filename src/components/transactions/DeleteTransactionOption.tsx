import { CloseButton } from "@headlessui/react"
import { TrashIcon } from "@heroicons/react/24/outline"

interface DeleteTransactionOptionProps {
  handleClick: () => void
}

const DeleteTransactionOption = ({ handleClick }: DeleteTransactionOptionProps) => {
  return (
    <CloseButton
      as="button"
      className="group flex w-full items-center rounded-md px-2 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
      onClick={handleClick}
    >
      <TrashIcon className="mr-2 h-4 w-4" aria-hidden="true" />
      Eliminar
    </CloseButton>
  )
}

export default DeleteTransactionOption
