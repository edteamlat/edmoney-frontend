import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react"
import { Fragment, ReactNode } from "react"

type PopoverPosition =
  | "bottom"
  | "top"
  | "left"
  | "right"
  | "bottom end"
  | "bottom start"
  | "top end"
  | "top start"

interface PopoverTemplateProps {
  trigger: ReactNode
  children: ReactNode
  position?: PopoverPosition
}

const PopoverTemplate = ({ trigger, children, position = "bottom" }: PopoverTemplateProps) => {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <PopoverButton
            className={`inline-flex items-center justify-center rounded-full p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 ${
              open ? "bg-gray-100 dark:bg-gray-700" : ""
            }`}
          >
            {trigger}
          </PopoverButton>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <PopoverPanel
              anchor={position}
              className="absolute z-10 mt-2 w-fit max-w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-2xl border border-gray-700  focus:outline-none"
            >
              <div className="px-1 py-1">{children}</div>
            </PopoverPanel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

export default PopoverTemplate
