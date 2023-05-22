import * as yup from 'yup'

export const createEditSettingsSchema = yup.object().shape({
  category: yup.string(),
  action: yup.string(),
})
