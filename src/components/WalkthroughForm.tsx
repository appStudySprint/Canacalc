'use client';

import { useState } from 'react';
import { User, Weight, Calendar, Calculator, ArrowRight, CheckCircle } from 'lucide-react';
import { Profile } from '@/types';
import { StorageManager } from '@/lib/storage';

interface WalkthroughFormProps {
  onComplete: (profile: Profile) => void;
}

type Step = 'welcome' | 'name' | 'age' | 'weight' | 'frequency' | 'method' | 'complete';

export default function WalkthroughForm({ onComplete }: WalkthroughFormProps) {
  const [currentStep, setCurrentStep] = useState<Step>('welcome');
  const [formData, setFormData] = useState({
    name: '',
    age: 25,
    weight: 70,
    frequency: 'occasional' as 'occasional' | 'regular' | 'chronic',
    method: 'smoked' as 'smoked' | 'oral'
  });

  const steps = [
    { id: 'welcome', title: 'Willkommen!', icon: User },
    { id: 'name', title: 'Wie heißen Sie?', icon: User },
    { id: 'age', title: 'Wie alt sind Sie?', icon: Calendar },
    { id: 'weight', title: 'Wie viel wiegen Sie?', icon: Weight },
    { id: 'frequency', title: 'Wie oft konsumieren Sie?', icon: Calendar },
    { id: 'method', title: 'Wie konsumieren Sie?', icon: Calculator },
    { id: 'complete', title: 'Profil erstellt!', icon: CheckCircle }
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
    const profile: Profile = {
      id: StorageManager.generateId(),
      name: formData.name,
      age: formData.age,
      weight: formData.weight,
      frequency: formData.frequency,
      method: formData.method,
      createdAt: new Date()
    };
    onComplete(profile);
  };

  const updateFormData = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'welcome':
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Hallo! 👋
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Ich helfe Ihnen dabei, Ihre sichere Wartezeit nach Cannabiskonsum zu berechnen.
              </p>
              <p className="text-sm text-gray-500">
                Lassen Sie uns Ihr Profil erstellen, um eine personalisierte Berechnung zu machen.
              </p>
            </div>
          </div>
        );

      case 'name':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Wie heißen Sie?
              </h2>
              <p className="text-gray-600">
                Ihr Name hilft uns, mehrere Profile auf dem gleichen Gerät zu verwalten.
              </p>
            </div>
            <div>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateFormData('name', e.target.value)}
                className="ios-input w-full px-4 py-3 text-lg text-center"
                placeholder="Ihr Name"
                autoFocus
              />
            </div>
          </div>
        );

      case 'age':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Wie alt sind Sie?
              </h2>
              <p className="text-gray-600">
                Das Alter beeinflusst den Stoffwechsel und damit die THC-Elimination.
              </p>
            </div>
            <div>
              <input
                type="number"
                value={formData.age || ''}
                onChange={(e) => {
                  const value = e.target.value;
                  updateFormData('age', value === '' ? 0 : parseInt(value) || 0);
                }}
                className="ios-input w-full px-4 py-3 text-lg text-center"
                placeholder="25"
                min="18"
                max="100"
                autoFocus
              />
              <p className="text-sm text-gray-500 text-center mt-2">Jahre</p>
            </div>
          </div>
        );

      case 'weight':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Wie viel wiegen Sie?
              </h2>
              <p className="text-gray-600">
                THC ist fettlöslich, daher ist das Körpergewicht wichtig für die Berechnung.
              </p>
            </div>
            <div>
              <input
                type="number"
                value={formData.weight || ''}
                onChange={(e) => {
                  const value = e.target.value;
                  updateFormData('weight', value === '' ? 0 : parseInt(value) || 0);
                }}
                className="ios-input w-full px-4 py-3 text-lg text-center"
                placeholder="70"
                min="40"
                max="200"
                autoFocus
              />
              <p className="text-sm text-gray-500 text-center mt-2">Kilogramm</p>
            </div>
          </div>
        );

      case 'frequency':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Wie oft konsumieren Sie?
              </h2>
              <p className="text-gray-600">
                Die Häufigkeit beeinflusst stark die THC-Eliminationszeit.
              </p>
            </div>
            <div className="space-y-3">
              {[
                { value: 'occasional', label: 'Gelegentlich', desc: 'Weniger als 1x pro Woche' },
                { value: 'regular', label: 'Regelmäßig', desc: '2-4x pro Woche' },
                { value: 'chronic', label: 'Chronisch', desc: 'Täglich oder fast täglich' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateFormData('frequency', option.value)}
                  className={`w-full p-4 rounded-lg border-2 transition-all ${
                    formData.frequency === option.value
                      ? 'border-blue-500 bg-blue-50'
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

      case 'method':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Wie konsumieren Sie?
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
                      ? 'border-blue-500 bg-blue-50'
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

      case 'complete':
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Perfekt! 🎉
              </h2>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Ihr Profil:</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Name:</strong> {formData.name}</p>
                  <p><strong>Alter:</strong> {formData.age} Jahre</p>
                  <p><strong>Gewicht:</strong> {formData.weight} kg</p>
                  <p><strong>Häufigkeit:</strong> {
                    formData.frequency === 'occasional' ? 'Gelegentlich' :
                    formData.frequency === 'regular' ? 'Regelmäßig' : 'Chronisch'
                  }</p>
                  <p><strong>Konsumart:</strong> {
                    formData.method === 'smoked' ? 'Geraucht' : 'Oral'
                  }</p>
                </div>
              </div>
              <p className="text-gray-600">
                Jetzt können Sie Ihren Konsum eintragen und die sichere Wartezeit berechnen.
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
      case 'name':
        return formData.name.trim().length >= 2;
      case 'age':
        return formData.age >= 18 && formData.age <= 100;
      case 'weight':
        return formData.weight >= 40 && formData.weight <= 200;
      case 'frequency':
      case 'method':
        return true;
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
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-1 ${
                  steps.findIndex(s => s.id === currentStep) > index
                    ? 'bg-blue-600'
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
            Berechnung starten
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