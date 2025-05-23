import { TRANSACTION_FORM_MODE } from "../types/form.types"

export const getFormButtonCopy = (
  mode: TRANSACTION_FORM_MODE,
  isCreating: boolean,
  isUpdating: boolean
): string => {
  if (isCreating) {
    return "Guardando..."
  }

  if (isUpdating) {
    return "Actualizando..."
  }

  return mode === TRANSACTION_FORM_MODE.EDIT ? "Actualizar Transacción" : "Guardar Transacción"
}
