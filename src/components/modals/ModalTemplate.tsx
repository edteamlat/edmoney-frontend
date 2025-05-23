import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"
import { ReactNode } from "react"

interface ModalTemplateProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

const ModalTemplate = ({ isOpen, onClose, children }: ModalTemplateProps) => {
  return (
    <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={onClose}>
      <DialogBackdrop transition className="fixed inset-0 bg-black/50 backdrop-blur-md" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-white dark:bg-gray-800 p-6 shadow-xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            <div className="flex flex-col gap-2 items-center text-center">{children}</div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default ModalTemplate
