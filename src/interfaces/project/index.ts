import { AttendanceInterface } from 'interfaces/attendance';
import { ComplianceDocumentInterface } from 'interfaces/compliance-document';
import { CostEstimationInterface } from 'interfaces/cost-estimation';
import { EquipmentInterface } from 'interfaces/equipment';
import { TaskInterface } from 'interfaces/task';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface ProjectInterface {
  id?: string;
  name: string;
  start_date: any;
  end_date: any;
  organization_id: string;
  created_at?: any;
  updated_at?: any;
  attendance?: AttendanceInterface[];
  compliance_document?: ComplianceDocumentInterface[];
  cost_estimation?: CostEstimationInterface[];
  equipment?: EquipmentInterface[];
  task?: TaskInterface[];
  organization?: OrganizationInterface;
  _count?: {
    attendance?: number;
    compliance_document?: number;
    cost_estimation?: number;
    equipment?: number;
    task?: number;
  };
}

export interface ProjectGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  organization_id?: string;
}
