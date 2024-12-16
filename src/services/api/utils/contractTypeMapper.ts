type ContractType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship';

const contractTypeMap: Record<string, ContractType> = {
  'cdi': 'Full-time',
  'cdd': 'Contract',
  'stage': 'Internship',
  'temps partiel': 'Part-time',
  'interim': 'Contract',
  // Add more mappings as needed
};

export function mapContractType(type: string): ContractType {
  if (!type) return 'Full-time';
  
  const normalizedType = type.toLowerCase().trim();
  return contractTypeMap[normalizedType] || 'Full-time';
}