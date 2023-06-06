import * as yup from 'yup'

export const createCategorySchema = yup.object().shape({
  name: yup.string(),
  IDColor: yup.string(),
  icon: yup.string(),
})

export const editCategorySchema = yup.object().shape({
  name: yup.string(),
  IDColor: yup.string(),
  icon: yup.string(),
})
