import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { calculateMonthlyPayment } from '../utils/calculateMonthlyPayment';

const router = Router();

const ApplicationSchema = z
  .object({
    firstName:        z.string().min(1),
    lastName:         z.string().min(1),
    email:            z.string().email(),
    employmentStatus: z.enum(['Employed','Self-Employed','Unemployed']),
    employerName:     z.string().optional(),
    loanPurpose:      z.string().min(1),
    amount:           z.number().min(2000),
    deposit:          z.number().min(0),
    term:             z.number().int().min(1).max(7),
  })
  .refine(
    data => data.employmentStatus !== 'Employed' || !!data.employerName,
    { message: 'Employer name required when employed', path: ['employerName'] }
  );

type Application = z.infer<typeof ApplicationSchema>;
const store: Application[] = [];

router.post('/apply', (req : any, res : any) => {
  const result = ApplicationSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.format() });
  }

  const data = result.data;
  store.push(data);

  const lenders = [
    { name: 'Lender A', rate: 5.5, fee: 10 },
    { name: 'Lender B', rate: 5.0, fee: 15 },
    { name: 'Lender C', rate: 6.0, fee: 0  }
  ];

  const principal = data.loanPurpose === 'Vehicle'
    ? data.amount - data.deposit
    : data.amount;

  const offers = lenders.map(l => ({
    lender:           l.name,
    interestRate:     l.rate,
    monthlyRepayment: Math.round(calculateMonthlyPayment(principal, l.rate, data.term)),
    fees:             l.fee > 0 ? `$${l.fee} processing fee` : 'No fees'
  }));

  res.json({ offers });
});

export default router;
