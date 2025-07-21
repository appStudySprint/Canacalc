'use client';

import { useState } from 'react';
import { Calendar, Clock, Calculator, CheckCircle, ArrowRight } from 'lucide-react';
import { Consumption } from '@/types';

interface ConsumptionWalkthroughProps {
  onComplete: (consumption: Consumption) => void;
}

type Step = 'welcome' | 'amount' | 'method' | 'timestamp' | 'complete';

export default function ConsumptionWalkthrough({ onComplete }: ConsumptionWalkthroughProps) {
  const [currentStep, setCurrentStep] = useState<Step>('welcome');
  const [formData, setFormData] = useState({
    amount: 0.1,
    method: 'smoked' as 'smoked' | 'oral',
    timestamp: new Date().toISOString().slice(0, 16)
  });

  const steps = [
    { id: 'welcome', title: 'Konsum eintragen', icon: Calculator },
    { id: 'amount', title: 'Wie viel haben Sie konsumiert?', icon: Calculator },
    { id: 'method', title: 'Wie haben Sie konsumiert?', icon: Calculator },
    { id: 'timestamp', title: 'Wann haben Sie konsumiert?', icon: Clock },
    { id: 'complete', title: 'Berechnung starten', icon: CheckCircle }
  ];

  const handleNext = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id as Step);
    }
  };

  const handleBack = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id as Step);
    }
  };

  const handleComplete = () => {
    const consumption: Consumption = {
      id: '',
      profileId: '',
      amount: formData.amount,
      method: formData.method,
      timestamp: new Date(formData.timestamp),
      createdAt: new Date()
    };
    onComplete(consumption);
  };

  const updateFormData = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'welcome':
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Calculator className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Konsum eintragen 📝
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Lassen Sie uns die Details Ihres Konsums eingeben, um Ihre sichere Wartezeit zu berechnen.
              </p>
              <p className="text-sm text-gray-500">
                Wir benötigen die Menge, Konsumart und den Zeitpunkt.
              </p>
            </div>
          </div>
        );

      case 'amount':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Wie viel haben Sie konsumiert?
              </h2>
              <p className="text-gray-600">
                Geben Sie die ungefähre Menge in Gramm ein.
              </p>
            </div>
            <div>
              <div className="relative">
                <input
                  type="number"
                  value={formData.amount || ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    updateFormData('amount', value === '' ? 0 : parseFloat(value) || 0);
                  }}
                  className="ios-input w-full px-4 py-3 text-lg text-center"
                  placeholder="0.1"
                  step="0.01"
                  min="0.01"
                  max="10"
                  autoFocus
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <span className="text-gray-500">g</span>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-600 font-medium">Beispiele:</p>
                <div className="text-xs text-gray-500 space-y-1">
                  <p>• 0.1g = Kleiner Joint</p>
                  <p>• 0.3g = Normaler Joint</p>
                  <p>• 0.5g = Großer Joint</p>
                  <p>• 1.0g = Mehrere Joints</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'method':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Wie haben Sie konsumiert?
              </h2>
              <p className="text-gray-600">
                Die Konsumart beeinflusst die Aufnahme und Elimination.
              </p>
            </div>
            <div className="space-y-3">
              {[
                { value: 'smoked', label: 'Geraucht', desc: 'Joint, Bong, Vaporizer, etc.' },
                { value: 'oral', label: 'Oral', desc: 'Essen, Tinktur, Kapseln, etc.' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateFormData('method', option.value)}
                  className={`w-full p-4 rounded-lg border-2 transition-all ${
                    formData.method === option.value
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-left">
                    <div className="font-medium text-gray-900">{option.label}</div>
                    <div className="text-sm text-gray-500">{option.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'timestamp':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Wann haben Sie konsumiert?
              </h2>
              <p className="text-gray-600">
                Der Zeitpunkt ist wichtig für die Berechnung der Wartezeit.
              </p>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Calendar className="w-5 h-5 text-gray-500" />
                <Clock className="w-5 h-5 text-gray-500" />
              </div>
              <input
                type="datetime-local"
                value={formData.timestamp}
                onChange={(e) => updateFormData('timestamp', e.target.value)}
                className="ios-input w-full px-4 py-3 text-lg text-center"
                autoFocus
              />
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-600 font-medium">Schnellauswahl:</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'Jetzt', value: new Date().toISOString().slice(0, 16) },
                    { label: 'Vor 1h', value: new Date(Date.now() - 60 * 60 * 1000).toISOString().slice(0, 16) },
                    { label: 'Vor 2h', value: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString().slice(0, 16) },
                    { label: 'Vor 4h', value: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString().slice(0, 16) }
                  ].map((option) => (
                    <button
                      key={option.label}
                      onClick={() => updateFormData('timestamp', option.value)}
                      className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'complete':
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Bereit zur Berechnung! 🚗
              </h2>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Ihr Konsum:</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Menge:</strong> {formData.amount}g</p>
                  <p><strong>Konsumart:</strong> {
                    formData.method === 'smoked' ? 'Geraucht' : 'Oral'
                  }</p>
                  <p><strong>Zeitpunkt:</strong> {
                    new Date(formData.timestamp).toLocaleString('de-DE')
                  }</p>
                </div>
              </div>
              <p className="text-gray-600">
                Klicken Sie auf "Berechnen", um Ihre sichere Wartezeit zu ermitteln.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 'amount':
        return formData.amount >= 0.01 && formData.amount <= 10;
      case 'method':
        return true;
      case 'timestamp':
        return formData.timestamp !== '';
      default:
        return true;
    }
  };

  return (
    <div className="ios-card p-8 max-w-md mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2 px-2">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                steps.findIndex(s => s.id === currentStep) >= index
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-1 ${
                  steps.findIndex(s => s.id === currentStep) > index
                    ? 'bg-green-600'
                    : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="min-h-[300px] flex items-center justify-center">
        {renderStep()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        {currentStep !== 'welcome' && (
          <button
            onClick={handleBack}
            className="ios-button-secondary px-6 py-2"
          >
            Zurück
          </button>
        )}
        
        {currentStep === 'complete' ? (
          <button
            onClick={handleComplete}
            className="ios-button-primary px-6 py-2 ml-auto"
          >
            Berechnen
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="ios-button-primary px-6 py-2 ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Weiter
          </button>
        )}
      </div>
    </div>
  );
} 