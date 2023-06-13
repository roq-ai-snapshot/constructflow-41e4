import { ProjectInterface } from 'interfaces/project';
import { GetQueryInterface } from 'interfaces';

export interface CostEstimationInterface {
  id?: string;
  estimated_cost: number;
  actual_cost: number;
  project_id: string;
  created_at?: any;
  updated_at?: any;

  project?: ProjectInterface;
  _count?: {};
}

export interface CostEstimationGetQueryInterface extends GetQueryInterface {
  id?: string;
  project_id?: string;
}
