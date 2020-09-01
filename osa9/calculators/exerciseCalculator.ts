
interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const parseArguments = (args: Array<string>): Array<number> => {
  if (args.length < 4) throw new Error('Not enough arguments');
  //if (args.length > 10) throw new Error('Too many arguments')
  args = args.slice(2, args.length);
  if (!args.reduce((truth, value) => truth || isNaN(Number(value)), false)) {
    return args.map(arg => Number(arg));
  } else {
    throw new Error('Provided arguments were not all numbers');
  }
};

const calculateExercises = (hours: Array<number>, target: number): Result => {
  const periodLength = hours.length;
  const trainingDays = hours.filter(hour => hour !== 0).length;
  const average = hours.reduce((sum, value) => (sum+value), 0) / periodLength;
  const success = average > target;
  const rating = Math.min(3, 1 + average/target);
  let ratingDescription = 'SLOW DOWN! You are hurting yourself.';

  if (rating < 1.25) {
    ratingDescription = `That's bad. Work harder.`;
  } else if (rating < 1.50) {
    ratingDescription = 'Not quite there yet. Time to double down.';
  } else if (rating < 1.75) {
    ratingDescription = `Getting there. Now it's not the time to slack off.`;
  } else if (rating < 2) {
    ratingDescription = 'Good job. Almost there.';
  } else if (rating < 2.25) {
    ratingDescription = 'Very good. You made it!';
  } else if (rating < 2.50) {
    ratingDescription = 'Exellent.';
  } else if (rating < 2.75) {
    ratingDescription = 'Be carefull not to work too hard';
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

try {
  const args = parseArguments(process.argv);
  const target = args[0];
  const hours = args.slice(1, args.length);
  console.log(calculateExercises(hours, target));
} catch (error) {
  if (error instanceof Error) console.log('Something went wrong', error.message);
}

export { calculateExercises };
