import * as yup from 'yup'

export const workflowFiltersSchema = yup.object().shape({
  search: yup.string(),
  searchBy: yup.string(),
  category: yup.string(),
  sortBy: yup.string(),
})
