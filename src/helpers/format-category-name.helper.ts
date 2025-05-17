export const formatCategoryName = (categoryId: string | undefined): string => {
  if (!categoryId) return "Sin categoría"

  return (
    categoryId.replace("cat-", "").charAt(0).toUpperCase() +
    categoryId.replace("cat-", "").slice(1)
  )
}
