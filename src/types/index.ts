export interface Profile {
  age: number;
  weight: number;
  frequency: 'occasional' | 'regular' | 'chronic';
  method: 'smoked' | 'oral';
}

export interface Consumption {
  amount: number;
  method: 'smoked' | 'oral';
  timestamp: Date;
}

export interface CalculationResult {
  safeDriveTime: Date;
  waitHours: number;
  explanation: string;
} 