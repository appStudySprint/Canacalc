'use client';

import { useState, useEffect } from 'react';
import { Calendar, User, Calculator, AlertTriangle, Info } from 'lucide-react';
import WalkthroughForm from '@/components/WalkthroughForm';
import ConsumptionWalkthrough from '@/components/ConsumptionWalkthrough';
import ResultCard from '@/components/ResultCard';
import PrivacyNotice from '@/components/PrivacyNotice';
import HamburgerMenu from '@/components/HamburgerMenu';
import { calculateWaitTime, calculateInformationalTime } from '@/lib/thcCalculator';
import { Consumption, Profile, CalculationResult } from '@/types';
import { StorageManager } from '@/lib/storage';

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [consumption, setConsumption] = useState<Consumption | null>(null);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Load current profile on client side
  useEffect(() => {
    const currentProfile = StorageManager.getCurrentProfile();
    if (currentProfile) {
      setProfile(currentProfile);
    }
  }, []);

  const handleProfileSubmit = (newProfile: Profile) => {
    StorageManager.saveProfile(newProfile);
    StorageManager.setCurrentProfile(newProfile.id);
    setProfile(newProfile);
  };

  const handleConsumptionSubmit = (newConsumption: Consumption) => {
    if (!profile) return;
    
    const consumptionWithId: Consumption = {
      ...newConsumption,
      id: StorageManager.generateId(),
      profileId: profile.id,
      createdAt: new Date()
    };
    
    StorageManager.saveConsumption(consumptionWithId);
    
    const waitHours = calculateWaitTime(
      profile.age,
      profile.weight,
      profile.frequency,
      consumptionWithId.amount,
      consumptionWithId.method
    );
    
    const informationalHours = calculateInformationalTime(
      profile.age,
      profile.weight,
      profile.frequency,
      consumptionWithId.amount,
      consumptionWithId.method
    );
    
    const safeDriveTime = new Date(consumptionWithId.timestamp);
    safeDriveTime.setHours(safeDriveTime.getHours() + waitHours);
    
    const informationalTime = new Date(consumptionWithId.timestamp);
    informationalTime.setHours(informationalTime.getHours() + informationalHours);
    
    const explanation = getExplanation(waitHours, profile.frequency, consumptionWithId.amount);
    
    const resultWithId: CalculationResult = {
      id: StorageManager.generateId(),
      profileId: profile.id,
      consumptionId: consumptionWithId.id,
      safeDriveTime,
      waitHours,
      explanation,
      informationalTime,
      informationalHours,
      createdAt: new Date()
    };
    
    StorageManager.saveResult(resultWithId);
    
    console.log('Saved calculation:', {
      profile: profile.name,
      consumption: consumptionWithId,
      result: resultWithId,
      history: StorageManager.getCalculationHistory()
    });
    
    // Show the new result (replaces the old one)
    setConsumption(consumptionWithId);
    setResult(resultWithId);
    setShowSuccessMessage(true);
    
    // Hide success message after 3 seconds, but keep the result
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const handleProfileSelect = (selectedProfile: Profile) => {
    setProfile(selectedProfile);
    setConsumption(null);
    setResult(null);
    setShowSuccessMessage(false);
  };

  const handleNewProfile = () => {
    setProfile(null);
    setConsumption(null);
    setResult(null);
    setShowSuccessMessage(false);
  };

  const handleNewCalculation = (useSameProfile: boolean) => {
    if (useSameProfile) {
      // Keep the same profile, just clear consumption and result
      setConsumption(null);
      setResult(null);
    } else {
      // Create new profile
      setProfile(null);
      setConsumption(null);
      setResult(null);
    }
    setShowSuccessMessage(false);
  };

  const getExplanation = (waitHours: number, frequency: string, amount: number) => {
    const days = Math.floor(waitHours / 24);
    const hours = waitHours % 24;
    
    let explanation = `Sie sollten ${waitHours} Stunden warten, um unter 1,0 ng/mL THC im Serum zu bleiben. `;
    
    if (days > 0) {
      explanation += `Das entspricht ${days} Tag${days > 1 ? 'en' : ''} und ${hours} Stunden. `;
    }
    
    explanation += `Dieser Wert ist konservativ berechnet und berücksichtigt Ihre Nutzungsfrequenz (${frequency}) und die konsumierte Menge (${amount}g).`;
    
    return explanation;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-900">
            🚗 Cannabis & Fahren
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-gray-600">
            Berechnen Sie Ihre sichere Wartezeit nach Cannabiskonsum basierend auf deutschen Gesetzen (§24a StVG) 
            und wissenschaftlichen Erkenntnissen zur THC-Elimination.
          </p>
        </div>

        {/* Legal Disclaimer */}
        <div className="ios-card p-6 mb-8 border-l-4 border-orange-500">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="ios-icon mt-0.5 flex-shrink-0 text-orange-500" />
            <div>
              <h3 className="font-semibold mb-1 text-gray-900">Wichtiger Hinweis</h3>
              <p className="text-sm text-gray-600">
                Diese Berechnung verwendet ein konservatives THC-Eliminationsmodell und garantiert keine rechtliche Immunität. 
                Der deutsche Gesetzgeber definiert einen Grenzwert von 3,5 ng/mL THC im Serum, aber wir empfehlen einen 
                sichereren Wert von unter 1,0 ng/mL. Bei Unsicherheit warten Sie länger oder nutzen Sie öffentliche Verkehrsmittel.
              </p>
            </div>
          </div>
        </div>

        {/* Walkthrough Forms */}
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          {showSuccessMessage && (
            <div className="ios-card p-4 border-l-4 border-green-500 bg-green-50 mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-green-800 font-medium">
                  Berechnung gespeichert! Siehe Verlauf im Menü.
                </p>
              </div>
            </div>
          )}

          {/* Profile Walkthrough */}
          {!profile && (
            <WalkthroughForm onComplete={handleProfileSubmit} />
          )}

          {/* Consumption Walkthrough */}
          {profile && !consumption && (
            <ConsumptionWalkthrough onComplete={handleConsumptionSubmit} />
          )}
        </div>

        {/* Results Section */}
        <div className="max-w-2xl mx-auto mt-8">
          {/* Result Card */}
          {result && (
            <div className="ios-card p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Calculator className="ios-icon text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Sichere Fahrzeit</h2>
              </div>
              <ResultCard 
                result={{
                  safeDriveTime: result.safeDriveTime,
                  waitHours: result.waitHours,
                  explanation: result.explanation
                }}
                informationalResult={{
                  safeDriveTime: result.informationalTime,
                  waitHours: result.informationalHours,
                  explanation: result.explanation
                }}
                onNewCalculation={handleNewCalculation}
              />
            </div>
          )}

          {/* Educational Info */}
          <div className="ios-card p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Info className="ios-icon text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Wichtige Informationen</h2>
            </div>
            <div className="space-y-3 text-sm text-gray-600">
              <p>
                <strong>Deutsches Recht (§24a StVG):</strong> Grenzwert von 3,5 ng/mL THC im Serum für das Führen von Kraftfahrzeugen.
              </p>
              <p>
                <strong>THC-Elimination:</strong> Gelegentliche Nutzer: ~1,3 Tage Halbwertszeit, chronische Nutzer: 5-13 Tage.
              </p>
              <p>
                <strong>Konservative Berechnung:</strong> Wir empfehlen einen Wert unter 0,1 ng/mL für maximale Sicherheit.
              </p>
              <p>
                <strong>Datenschutz:</strong> Alle Daten werden lokal gespeichert und nicht an Dritte weitergegeben (DSGVO-konform).
              </p>
            </div>
          </div>

          {/* Privacy Notice */}
          <PrivacyNotice />
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>
            Diese Anwendung dient nur zu Informationszwecken. Bei rechtlichen Fragen konsultieren Sie einen Anwalt.
          </p>
        </footer>
      </div>

      {/* Hamburger Menu */}
      <HamburgerMenu 
        onProfileSelect={handleProfileSelect}
        onNewProfile={handleNewProfile}
      />
    </div>
  );
}
