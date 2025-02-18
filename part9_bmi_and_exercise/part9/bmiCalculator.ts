export function calculateBmi(height_cm: number, weight: number): string {
    const height_m = height_cm / 100;
    const bmi = weight / (height_m * height_m);
  
    if (bmi < 16.0) {
      return 'Underweight (Severe thinness)';
    } else if (bmi >= 16.0 && bmi < 17.0) {
      return 'Underweight (Moderate thinness)';
    } else if (bmi >= 17.0 && bmi < 18.5) {
      return 'Underweight (Mild thinness)';
    } else if (bmi >= 18.5 && bmi < 25.0) {
      return 'Normal range';
    } else if (bmi >= 25.0 && bmi < 30.0) {
      return 'Overweight (Pre-obese)';
    } else if (bmi >= 30.0 && bmi < 35.0) {
      return 'Obese (Class I)';
    } else if (bmi >= 35.0 && bmi < 40.0) {
      return 'Obese (Class II)';
    } else {
      return 'Obese (Class III)';
    }
  }
  
  if (require.main === module) {
    const args = process.argv.slice(2);
  
    if (args.length < 2) {
      console.error('please provide height (in cm) and weight (in kg) as arguments');
      process.exit(1);
    }
  
    const [heightArg, weightArg] = args;
  
    const height_cm = Number(heightArg);
    const weight = Number(weightArg);
  
    if (isNaN(height_cm) || isNaN(weight)) {
      console.error('height and weight must be numbers');
      process.exit(1);
    }
  
    console.log(calculateBmi(height_cm, weight));
  }

