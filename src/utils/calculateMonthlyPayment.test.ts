import { calculateMonthlyPayment } from './calculateMonthlyPayment';

describe('calculateMonthlyPayment', () => {
  it('calculates correct payment for interest > 0', () => {
    const res = calculateMonthlyPayment(10000, 5, 2);
    expect(res).toBeCloseTo(438.71, 2);
  });

  it('handles zero interest rate', () => {
    const res = calculateMonthlyPayment(5000, 0, 5);
    expect(res).toBeCloseTo(83.33, 2);
  });
});