export function calculateMonthlyPayment(
  amount: number,
  annualRate: number,
  termYears: number
): number {
  const monthlyRate = annualRate / 100 / 12;
  const n = termYears * 12;
  if (monthlyRate === 0) {
    return amount / n;
  }
  return (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
}
