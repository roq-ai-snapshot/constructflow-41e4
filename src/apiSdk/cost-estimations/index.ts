import axios from 'axios';
import queryString from 'query-string';
import { CostEstimationInterface, CostEstimationGetQueryInterface } from 'interfaces/cost-estimation';
import { GetQueryInterface } from '../../interfaces';

export const getCostEstimations = async (query?: CostEstimationGetQueryInterface) => {
  const response = await axios.get(`/api/cost-estimations${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCostEstimation = async (costEstimation: CostEstimationInterface) => {
  const response = await axios.post('/api/cost-estimations', costEstimation);
  return response.data;
};

export const updateCostEstimationById = async (id: string, costEstimation: CostEstimationInterface) => {
  const response = await axios.put(`/api/cost-estimations/${id}`, costEstimation);
  return response.data;
};

export const getCostEstimationById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/cost-estimations/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCostEstimationById = async (id: string) => {
  const response = await axios.delete(`/api/cost-estimations/${id}`);
  return response.data;
};
