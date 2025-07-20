'use client';

import { useState } from 'react';
import { Calendar, User, Calculator, AlertTriangle, Info } from 'lucide-react';
import ConsumptionForm from '@/components/ConsumptionForm';
import ProfileForm from '@/components/ProfileForm';
import ResultCard from '@/components/ResultCard';
import PrivacyNotice from '@/components/PrivacyNotice';
import { calculateWaitTime } from '@/lib/thcCalculator';
import { Consumption, Profile } from '@/types';

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [consumption, setConsumption] = useState<Consumption | null>(null);
  const [result, setResult] = useState<{
    safeDriveTime: Date;
    waitHours: number;
    explanation: string;
  } | null>(null);

  const handleProfileSubmit = (newProfile: Profile) => {
    setProfile(newProfile);
  };

  const handleConsumptionSubmit = (newConsumption: Consumption) => {
    setConsumption(newConsumption);
    
    if (profile) {
      const waitHours = calculateWaitTime(
        profile.age,
        profile.weight,
        profile.frequency,
        newConsumption.amount,
        newConsumption.method
      );
      
      const safeDriveTime = new Date(newConsumption.timestamp);
      safeDriveTime.setHours(safeDriveTime.getHours() + waitHours);
      
      const explanation = getExplanation(waitHours, profile.frequency, newConsumption.amount);
      
      setResult({
        safeDriveTime,
        waitHours,
        explanation
      });
    }
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🚗 Cannabis & Fahren
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Berechnen Sie Ihre sichere Wartezeit nach Cannabiskonsum basierend auf deutschen Gesetzen (§24a StVG) 
            und wissenschaftlichen Erkenntnissen zur THC-Elimination.
          </p>
        </div>

        {/* Legal Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-yellow-800 mb-1">Wichtiger Hinweis</h3>
              <p className="text-yellow-700 text-sm">
                Diese Berechnung verwendet ein konservatives THC-Eliminationsmodell und garantiert keine rechtliche Immunität. 
                Der deutsche Gesetzgeber definiert einen Grenzwert von 3,5 ng/mL THC im Serum, aber wir empfehlen einen 
                sichereren Wert von unter 1,0 ng/mL. Bei Unsicherheit warten Sie länger oder nutzen Sie öffentliche Verkehrsmittel.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Forms */}
          <div className="space-y-6">
            {/* Profile Form */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <User className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-800">Profil erstellen</h2>
              </div>
              <ProfileForm onSubmit={handleProfileSubmit} />
            </div>

            {/* Consumption Form */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Calendar className="w-5 h-5 text-green-600" />
                <h2 className="text-xl font-semibold text-gray-800">Konsum eintragen</h2>
              </div>
              <ConsumptionForm onSubmit={handleConsumptionSubmit} />
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            {/* Result Card */}
            {result && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Calculator className="w-5 h-5 text-purple-600" />
                  <h2 className="text-xl font-semibold text-gray-800">Sichere Fahrzeit</h2>
                </div>
                <ResultCard result={result} />
              </div>
            )}

            {/* Educational Info */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Info className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-800">Wichtige Informationen</h2>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <p>
                  <strong>Deutsches Recht (§24a StVG):</strong> Grenzwert von 3,5 ng/mL THC im Serum für das Führen von Kraftfahrzeugen.
                </p>
                <p>
                  <strong>THC-Elimination:</strong> Gelegentliche Nutzer: ~1,3 Tage Halbwertszeit, chronische Nutzer: 5-13 Tage.
                </p>
                <p>
                  <strong>Konservative Berechnung:</strong> Wir empfehlen einen Wert unter 1,0 ng/mL für maximale Sicherheit.
                </p>
                <p>
                  <strong>Datenschutz:</strong> Alle Daten werden lokal gespeichert und nicht an Dritte weitergegeben (DSGVO-konform).
                </p>
              </div>
            </div>

            {/* Privacy Notice */}
            <PrivacyNotice />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>
            Diese Anwendung dient nur zu Informationszwecken. Bei rechtlichen Fragen konsultieren Sie einen Anwalt.
          </p>
        </footer>
      </div>
    </div>
  );
}
