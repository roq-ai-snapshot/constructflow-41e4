import * as yup from 'yup';

export const costEstimationValidationSchema = yup.object().shape({
  estimated_cost: yup.number().integer().required(),
  actual_cost: yup.number().integer().required(),
  project_id: yup.string().nullable().required(),
});
