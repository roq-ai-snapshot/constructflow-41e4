import * as yup from 'yup';
import { attendanceValidationSchema } from 'validationSchema/attendances';
import { complianceDocumentValidationSchema } from 'validationSchema/compliance-documents';
import { costEstimationValidationSchema } from 'validationSchema/cost-estimations';
import { equipmentValidationSchema } from 'validationSchema/equipment';
import { taskValidationSchema } from 'validationSchema/tasks';

export const projectValidationSchema = yup.object().shape({
  name: yup.string().required(),
  start_date: yup.date().required(),
  end_date: yup.date().required(),
  organization_id: yup.string().nullable().required(),
  attendance: yup.array().of(attendanceValidationSchema),
  compliance_document: yup.array().of(complianceDocumentValidationSchema),
  cost_estimation: yup.array().of(costEstimationValidationSchema),
  equipment: yup.array().of(equipmentValidationSchema),
  task: yup.array().of(taskValidationSchema),
});
