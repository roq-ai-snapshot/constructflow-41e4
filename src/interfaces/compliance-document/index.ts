import { ProjectInterface } from 'interfaces/project';
import { GetQueryInterface } from 'interfaces';

export interface ComplianceDocumentInterface {
  id?: string;
  name: string;
  document: string;
  project_id: string;
  created_at?: any;
  updated_at?: any;

  project?: ProjectInterface;
  _count?: {};
}

export interface ComplianceDocumentGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  document?: string;
  project_id?: string;
}
