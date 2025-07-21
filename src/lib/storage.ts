import { Profile, Consumption, CalculationResult, CalculationHistory } from '@/types';

const STORAGE_KEYS = {
  PROFILES: 'cannabis_profiles',
  CONSUMPTIONS: 'cannabis_consumptions',
  RESULTS: 'cannabis_results',
  CURRENT_PROFILE: 'cannabis_current_profile'
};

export class StorageManager {
  // Profile Management
  static saveProfile(profile: Profile): void {
    if (typeof window === 'undefined') return;
    const profiles = this.getProfiles();
    const existingIndex = profiles.findIndex(p => p.id === profile.id);
    
    if (existingIndex >= 0) {
      profiles[existingIndex] = profile;
    } else {
      profiles.push(profile);
    }
    
    localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(profiles));
  }

  static getProfiles(): Profile[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEYS.PROFILES);
    if (!data) return [];
    
    const profiles = JSON.parse(data);
    return profiles.map((p: Profile & { createdAt: string }) => ({
      ...p,
      createdAt: new Date(p.createdAt)
    }));
  }

  static getProfile(id: string): Profile | null {
    const profiles = this.getProfiles();
    return profiles.find(p => p.id === id) || null;
  }

  static deleteProfile(id: string): void {
    if (typeof window === 'undefined') return;
    const profiles = this.getProfiles().filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(profiles));
    
    // Also delete related consumptions and results
    this.deleteConsumptionsByProfileId(id);
    this.deleteResultsByProfileId(id);
  }

  // Consumption Management
  static saveConsumption(consumption: Consumption): void {
    if (typeof window === 'undefined') return;
    const consumptions = this.getConsumptions();
    const existingIndex = consumptions.findIndex(c => c.id === consumption.id);
    
    if (existingIndex >= 0) {
      consumptions[existingIndex] = consumption;
    } else {
      consumptions.push(consumption);
    }
    
    localStorage.setItem(STORAGE_KEYS.CONSUMPTIONS, JSON.stringify(consumptions));
  }

  static getConsumptions(): Consumption[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEYS.CONSUMPTIONS);
    if (!data) return [];
    
    const consumptions = JSON.parse(data);
    return consumptions.map((c: Consumption & { timestamp: string; createdAt: string }) => ({
      ...c,
      timestamp: new Date(c.timestamp),
      createdAt: new Date(c.createdAt)
    }));
  }

  static getConsumptionsByProfileId(profileId: string): Consumption[] {
    return this.getConsumptions().filter(c => c.profileId === profileId);
  }

  static deleteConsumptionsByProfileId(profileId: string): void {
    if (typeof window === 'undefined') return;
    const consumptions = this.getConsumptions().filter(c => c.profileId !== profileId);
    localStorage.setItem(STORAGE_KEYS.CONSUMPTIONS, JSON.stringify(consumptions));
  }

  // Result Management
  static saveResult(result: CalculationResult): void {
    if (typeof window === 'undefined') return;
    const results = this.getResults();
    const existingIndex = results.findIndex(r => r.id === result.id);
    
    if (existingIndex >= 0) {
      results[existingIndex] = result;
    } else {
      results.push(result);
    }
    
    localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(results));
  }

  static getResults(): CalculationResult[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEYS.RESULTS);
    if (!data) return [];
    
    const results = JSON.parse(data);
    return results.map((r: CalculationResult & { safeDriveTime: string; informationalTime: string; createdAt: string }) => ({
      ...r,
      safeDriveTime: new Date(r.safeDriveTime),
      informationalTime: new Date(r.informationalTime),
      createdAt: new Date(r.createdAt)
    }));
  }

  static getResultsByProfileId(profileId: string): CalculationResult[] {
    return this.getResults().filter(r => r.profileId === profileId);
  }

  static deleteResultsByProfileId(profileId: string): void {
    if (typeof window === 'undefined') return;
    const results = this.getResults().filter(r => r.profileId !== profileId);
    localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(results));
  }

  // History Management
  static getCalculationHistory(): CalculationHistory[] {
    const profiles = this.getProfiles();
    const consumptions = this.getConsumptions();
    const results = this.getResults();
    
    return results.map(result => {
      const profile = profiles.find(p => p.id === result.profileId);
      const consumption = consumptions.find(c => c.id === result.consumptionId);
      
      if (!profile || !consumption) return null;
      
      return {
        profile,
        consumption,
        result
      };
    }).filter(Boolean) as CalculationHistory[];
  }

  static getHistoryByProfileId(profileId: string): CalculationHistory[] {
    return this.getCalculationHistory().filter(h => h.profile.id === profileId);
  }

  // Current Profile Management
  static setCurrentProfile(profileId: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.CURRENT_PROFILE, profileId);
  }

  static getCurrentProfileId(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(STORAGE_KEYS.CURRENT_PROFILE);
  }

  static getCurrentProfile(): Profile | null {
    if (typeof window === 'undefined') return null;
    const profileId = this.getCurrentProfileId();
    return profileId ? this.getProfile(profileId) : null;
  }

  // Utility functions
  static generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  static clearAllData(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.PROFILES);
    localStorage.removeItem(STORAGE_KEYS.CONSUMPTIONS);
    localStorage.removeItem(STORAGE_KEYS.RESULTS);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_PROFILE);
  }
} 