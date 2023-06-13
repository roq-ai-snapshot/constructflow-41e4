import axios from 'axios';
import queryString from 'query-string';
import { ComplianceDocumentInterface, ComplianceDocumentGetQueryInterface } from 'interfaces/compliance-document';
import { GetQueryInterface } from '../../interfaces';

export const getComplianceDocuments = async (query?: ComplianceDocumentGetQueryInterface) => {
  const response = await axios.get(`/api/compliance-documents${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createComplianceDocument = async (complianceDocument: ComplianceDocumentInterface) => {
  const response = await axios.post('/api/compliance-documents', complianceDocument);
  return response.data;
};

export const updateComplianceDocumentById = async (id: string, complianceDocument: ComplianceDocumentInterface) => {
  const response = await axios.put(`/api/compliance-documents/${id}`, complianceDocument);
  return response.data;
};

export const getComplianceDocumentById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/compliance-documents/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteComplianceDocumentById = async (id: string) => {
  const response = await axios.delete(`/api/compliance-documents/${id}`);
  return response.data;
};
