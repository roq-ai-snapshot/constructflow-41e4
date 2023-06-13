import * as yup from 'yup';

export const taskValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  start_date: yup.date().required(),
  end_date: yup.date().required(),
  status: yup.string().required(),
  project_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
