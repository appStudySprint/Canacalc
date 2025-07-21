export interface Profile {
  id: string;
  name: string;
  age: number;
  weight: number;
  frequency: 'occasional' | 'regular' | 'chronic';
  method: 'smoked' | 'oral';
  createdAt: Date;
}

export interface Consumption {
  id: string;
  profileId: string;
  amount: number;
  method: 'smoked' | 'oral';
  timestamp: Date;
  createdAt: Date;
}

export interface CalculationResult {
  id: string;
  profileId: string;
  consumptionId: string;
  safeDriveTime: Date;
  waitHours: number;
  explanation: string;
  informationalTime: Date;
  informationalHours: number;
  createdAt: Date;
}

export interface CalculationHistory {
  profile: Profile;
  consumption: Consumption;
  result: CalculationResult;
} 