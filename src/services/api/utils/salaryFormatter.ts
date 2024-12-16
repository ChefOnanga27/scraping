export function formatSalary(salary: any): string | undefined {
  if (!salary) return undefined;

  // Handle different salary formats
  if (typeof salary === 'string') {
    return salary.trim();
  }

  if (typeof salary === 'object') {
    const min = salary.min;
    const max = salary.max;
    const currency = salary.currency || 'FCFA';

    if (min && max) {
      return `${formatNumber(min)} - ${formatNumber(max)} ${currency}`;
    }
    if (min) {
      return `À partir de ${formatNumber(min)} ${currency}`;
    }
    if (max) {
      return `Jusqu'à ${formatNumber(max)} ${currency}`;
    }
  }

  return undefined;
}

function formatNumber(num: number): string {
  return new Intl.NumberFormat('fr-FR').format(num);
}