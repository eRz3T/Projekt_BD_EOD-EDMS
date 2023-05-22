import * as yup from 'yup'

export const createEditStepSchema = yup.object().shape({
  stepName: yup.string(),
  assignTo: yup.string(),
  nextStep: yup.string(),
  prevStep: yup.string(),
})
