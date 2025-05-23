import { DialogTitle } from "@headlessui/react"
import { CheckIcon } from "@heroicons/react/24/outline"

const SuccessMessage = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="rounded-full bg-green-100 dark:bg-green-900 p-3">
        <CheckIcon className="h-12 w-12 text-green-600 dark:text-green-400" />
      </div>
      <DialogTitle as="h3" className="text-lg font-medium text-gray-900 dark:text-gray-100">
        Transacción borrada exitosamente
      </DialogTitle>
    </div>
  )
}

export default SuccessMessage
