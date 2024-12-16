export function formatLocation(location: string): string {
  // Standardize location format
  if (!location) return 'Gabon';
  
  // Remove extra spaces and normalize case
  location = location.trim().replace(/\s+/g, ' ');
  
  // Add country if not present
  if (!location.toLowerCase().includes('gabon')) {
    location += ', Gabon';
  }
  
  return location;
}