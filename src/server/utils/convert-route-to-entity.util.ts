const mapping: Record<string, string> = {
  attendances: 'attendance',
  'compliance-documents': 'compliance_document',
  'cost-estimations': 'cost_estimation',
  equipment: 'equipment',
  organizations: 'organization',
  projects: 'project',
  tasks: 'task',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
