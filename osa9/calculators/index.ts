import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import { isArray } from 'util';

interface ReqBodyType {
  daily_exercises: Array<number>,
  target: number
}

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  const bmi = calculateBmi(height, weight);
  res.json({
    height,
    weight,
    bmi
  });
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body as ReqBodyType;
  
  if (!daily_exercises || !target) {
    return res.status(401).json({
      error: "parameters missing"
    });
  }
  if (isNaN(Number(target)) || 
  (!isArray(daily_exercises) ||
  daily_exercises.some(value => isNaN(Number(value))))) {
    return res.status(401).json({
      error: "malformatted parameters"
    });
  }
  const result = calculateExercises(daily_exercises, target);
  return res.json(result);
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}` );
});