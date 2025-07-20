/**
 * THC Elimination Calculator based on scientific research and German legal requirements
 * Uses conservative estimates to ensure users stay well below the 3.5 ng/mL legal limit
 * Target: <1.0 ng/mL for maximum safety
 */

export function calculateWaitTime(
  age: number,
  weight: number,
  frequency: 'occasional' | 'regular' | 'chronic',
  amount: number,
  method: 'smoked' | 'oral' = 'smoked'
): number {
  // Base hours based on usage frequency (conservative estimates)
  let baseHours: number;
  
  switch (frequency) {
    case 'occasional':
      // Occasional users: 12-24 hours minimum
      baseHours = 18;
      break;
    case 'regular':
      // Regular users (2-4x/week): 3-5 days minimum
      baseHours = 96; // 4 days
      break;
    case 'chronic':
      // Chronic users (daily): 7-28 days minimum
      baseHours = 168; // 7 days
      break;
    default:
      baseHours = 24;
  }

  // Adjust for dosage amount
  if (amount > 0.5) {
    // High dose: double the wait time
    baseHours *= 2;
  } else if (amount < 0.1) {
    // Low dose: reduce wait time by 25%
    baseHours *= 0.75;
  }

  // Adjust for consumption method
  if (method === 'oral') {
    // Oral consumption has longer absorption and elimination
    // THC is more bioavailable orally but takes longer to clear
    baseHours *= 1.5;
  }

  // Adjust for age (slower metabolism in older users)
  if (age > 60) {
    baseHours *= 1.2;
  } else if (age > 40) {
    baseHours *= 1.1;
  }

  // Adjust for body weight (THC is fat-soluble)
  if (weight > 100) {
    // Higher body fat = longer retention
    baseHours *= 1.2;
  } else if (weight < 60) {
    // Lower body weight = faster clearance
    baseHours *= 0.9;
  }

  // Ensure minimum wait time of 12 hours for safety
  if (baseHours < 12) {
    baseHours = 12;
  }

  // Round up to the nearest hour for conservative estimate
  return Math.ceil(baseHours);
}

/**
 * Get frequency description in German
 */
export function getFrequencyDescription(frequency: 'occasional' | 'regular' | 'chronic'): string {
  switch (frequency) {
    case 'occasional':
      return 'Gelegentlich (weniger als 1x pro Woche)';
    case 'regular':
      return 'Regelmäßig (2-4x pro Woche)';
    case 'chronic':
      return 'Chronisch (täglich oder fast täglich)';
    default:
      return 'Unbekannt';
  }
}

/**
 * Get method description in German
 */
export function getMethodDescription(method: 'smoked' | 'oral'): string {
  switch (method) {
    case 'smoked':
      return 'Geraucht (Joint, Bong, etc.)';
    case 'oral':
      return 'Oral (Essen, Tinktur, etc.)';
    default:
      return 'Unbekannt';
  }
}

/**
 * Calculate THC half-life based on usage frequency
 */
export function getTHCHalfLife(frequency: 'occasional' | 'regular' | 'chronic'): number {
  switch (frequency) {
    case 'occasional':
      return 1.3; // ~1.3 days for occasional users
    case 'regular':
      return 3.0; // ~3 days for regular users
    case 'chronic':
      return 7.0; // 5-13 days for chronic users (conservative estimate)
    default:
      return 2.0;
  }
} 