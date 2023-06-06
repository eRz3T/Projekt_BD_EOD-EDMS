import * as yup from 'yup'

export const workflowFiltersSchema = yup.object().shape({
  search: yup.string(),
  category: yup.string(),
})
