import express, { Request, Response } from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());
app.use((err: SyntaxError, _req: Request, res: Response, next: () => void): void => {
  if (err instanceof SyntaxError && 'body' in err) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }
  next();
});


const PORT = 3003;


app.get('/hello', (_req: Request, res: Response) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: Request, res: Response) => {
    const { height, weight } = req.query;
  
    const height_cm = Number(height);
    const weight_kg = Number(weight);
  
    if (!height || !weight || isNaN(height_cm) || isNaN(weight_kg)) {
      res.status(400).json({ error: 'malformatted parameters' });
      return;
    }
  
    const bmi = calculateBmi(height_cm, weight_kg);
  
    res.json({
      weight: weight_kg,
      height: height_cm,
      bmi
    });
  });

  interface ExerciseRequestBody {
    daily_exercises: number[];
    target: number;
  }
  
  app.post('/exercises', (req: Request, res: Response) => {
    const body = req.body as ExerciseRequestBody;
  
    const { daily_exercises, target } = body;
  
    if (!daily_exercises || target === undefined) {
      return res.status(400).json({ error: 'parameters missing' });
    }
  
    if (
      !Array.isArray(daily_exercises) ||
      !daily_exercises.every((hour) => typeof hour === 'number') ||
      typeof target !== 'number'
    ) {
      return res.status(400).json({ error: 'malformatted parameters' });
    }
  
    const result = calculateExercises(daily_exercises, target);
    return res.json(result);
  });
  
  

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
