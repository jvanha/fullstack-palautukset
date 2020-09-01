

const parseBmiArguments = (args:Array<string>): Array<number> => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) || !isNaN(Number(args[3]))) {
    return [Number(args[2]), Number(args[3])];
  } else {
    throw new Error('Provided arguments were not all numbers');
  }
};

const calculateBmi = (height: number, weight: number): string => {
  const BMI = weight/(height/100)**2;
  //console.log(BMI)
  if (BMI < 15) return 'Very severely underweight';
  if (BMI < 16) return 'Severely unsedweight';
  if (BMI < 18.5) return 'Underweight';
  if (BMI < 25) return 'Normal (healthy weight)';
  if (BMI < 30) return 'Overweight';
  if (BMI < 35) return 'Obese Class I (Moderately obese)';
  if (BMI < 49) return 'Obese Class II (Severely obese)';
  
  return 'Obese Class III (Very severely obese';
};

try {
  const [ height, weight ] = parseBmiArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error) {
  if (error instanceof Error) console.log('Something went wrong:', error.message);
}
//console.log(calculateBmi(185, 95))

export { calculateBmi };