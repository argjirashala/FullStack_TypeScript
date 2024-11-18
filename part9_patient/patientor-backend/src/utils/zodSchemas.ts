import { z } from 'zod';
import { Gender } from '../types';

export const NewPatientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  dateOfBirth: z.string().regex(
    /^\d{4}-\d{2}-\d{2}$/,
    'Date of Birth must be in YYYY-MM-DD format'
  ),
  ssn: z.string().min(1, 'SSN is required'),
  gender: z.enum([Gender.Male, Gender.Female, Gender.Other]),
  occupation: z.string().min(1, 'Occupation is required'),
});

export type NewPatientZod = z.infer<typeof NewPatientSchema>;
