import * as yup from 'yup';
import { projectValidationSchema } from 'validationSchema/projects';

export const organizationValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  image: yup.string(),
  user_id: yup.string().nullable().required(),
  project: yup.array().of(projectValidationSchema),
});
