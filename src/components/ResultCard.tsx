'use client';

import { useState } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { de } from 'date-fns/locale';
import { Car, Clock, AlertCircle, CheckCircle, Info, Calculator, User } from 'lucide-react';

interface ResultCardProps {
  result: {
    safeDriveTime: Date;
    waitHours: number;
    explanation: string;
  };
  informationalResult?: {
    safeDriveTime: Date;
    waitHours: number;
    explanation: string;
  };
  onNewCalculation: (useSameProfile: boolean) => void;
}

export default function ResultCard({ result, informationalResult, onNewCalculation }: ResultCardProps) {
  const [activeTab, setActiveTab] = useState<'conservative' | 'informational'>('conservative');
  const [showNewCalculationOptions, setShowNewCalculationOptions] = useState(false);
  
  const currentResult = activeTab === 'conservative' ? result : informationalResult;
  
  if (!currentResult) {
    return null;
  }

  const { safeDriveTime, waitHours, explanation } = currentResult;
  const now = new Date();
  const isSafeToDrive = now >= safeDriveTime;
  const days = Math.floor(waitHours / 24);
  const hours = waitHours % 24;

  const getStatusColor = () => {
    if (isSafeToDrive) {
      return 'text-green-600 bg-green-50 border-green-200';
    } else {
      return 'text-red-600 bg-red-50 border-red-200';
    }
  };

  const getStatusIcon = () => {
    if (isSafeToDrive) {
      return <CheckCircle className="w-5 h-5" />;
    } else {
      return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getStatusText = () => {
    if (isSafeToDrive) {
      return 'Sicher zu fahren';
    } else {
      return 'Noch nicht sicher zu fahren';
    }
  };

  const handleNewCalculationClick = () => {
    setShowNewCalculationOptions(true);
  };

  const handleOptionSelect = (useSameProfile: boolean) => {
    setShowNewCalculationOptions(false);
    onNewCalculation(useSameProfile);
  };

  return (
    <div className="space-y-4">
      {/* New Calculation Button - Centered */}
      <div className="flex justify-center mb-4 p-2 bg-gray-50 border border-gray-200 rounded-lg">
        <button
          onClick={handleNewCalculationClick}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center space-x-2 text-base shadow-sm"
        >
          <Calculator className="w-5 h-5" />
          <span>Neue Berechnung</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('conservative')}
          className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'conservative'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <div className="flex items-center justify-center space-x-1">
            <CheckCircle className="w-4 h-4" />
            <span>0,1 ng/mL</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">Konservativ</div>
        </button>
        <button
          onClick={() => setActiveTab('informational')}
          className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'informational'
              ? 'bg-white text-green-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <div className="flex items-center justify-center space-x-1">
            <Info className="w-4 h-4" />
            <span>0,25 ng/mL</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">Informativ</div>
        </button>
      </div>

      {/* Status Card */}
      <div className={`border rounded-lg p-4 ${getStatusColor()}`}>
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <span className="font-semibold">{getStatusText()}</span>
        </div>
        {activeTab === 'informational' && (
          <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
            <strong>⚠️ Wichtiger Hinweis:</strong> Dieser Wert ist nur informativ und nicht für sicheres Fahren empfohlen.
          </div>
        )}
      </div>

      {/* Safe Drive Time */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Car className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-800">Sichere Fahrzeit</h3>
        </div>
        <p className="text-2xl font-bold text-blue-600 mb-1">
          {format(safeDriveTime, "dd.MM.yyyy 'um' HH:mm", { locale: de })}
        </p>
        <p className="text-sm text-gray-600">
          {isSafeToDrive 
            ? `Sie können seit ${formatDistanceToNow(safeDriveTime, { locale: de, addSuffix: true })} sicher fahren`
            : `Noch ${formatDistanceToNow(safeDriveTime, { locale: de })} bis zur sicheren Fahrzeit`
          }
        </p>
        <p className="text-xs text-gray-500 mt-1">
          <strong>{activeTab === 'conservative' ? 'Konservativer Wert:' : 'Informationswert:'}</strong> 
          {activeTab === 'conservative' ? ' Unter 0,1 ng/mL für maximale Sicherheit' : ' Unter 0,25 ng/mL (nur informativ)'}
        </p>
      </div>

      {/* Wait Time Details */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Clock className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold text-gray-800">Wartezeit</h3>
        </div>
        <div className="space-y-2">
          <p className="text-lg font-semibold text-purple-600">
            {waitHours} Stunden
          </p>
          {days > 0 && (
            <p className="text-sm text-gray-600">
              Das entspricht {days} Tag{days > 1 ? 'en' : ''} und {hours} Stunden
            </p>
          )}
          <p className="text-xs text-gray-500">
            {activeTab === 'conservative' ? 'Konservativ berechnet für maximale Sicherheit' : 'Informativ berechnet - nicht für sicheres Fahren empfohlen'}
          </p>
        </div>
      </div>

      {/* Explanation */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-800 mb-2">Erklärung</h3>
        <p className="text-sm text-blue-700 leading-relaxed">
          {explanation}
        </p>
      </div>

      {/* Legal Information */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-semibold text-yellow-800 mb-2">Rechtliche Hinweise</h3>
        <div className="space-y-2 text-sm text-yellow-700">
          <p>
            • <strong>Deutscher Grenzwert:</strong> 3,5 ng/mL THC im Serum (§24a StVG)
          </p>
          <p>
            • <strong>Empfohlener Sicherheitswert:</strong> Unter 0,1 ng/mL (konservativ)
          </p>
          <p>
            • <strong>Informationswert:</strong> Unter 0,25 ng/mL (nur zur Information)
          </p>
          <p>
            • <strong>Keine Garantie:</strong> Diese Berechnung ersetzt keine rechtliche Beratung
          </p>
          <p>
            • <strong>Haftungsausschluss:</strong> Der Nutzer trägt die volle Verantwortung
          </p>
        </div>
      </div>

      {/* Scientific References */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-2">Wissenschaftliche Grundlagen</h3>
        <div className="space-y-1 text-xs text-gray-600">
          <p>• THC-Halbwertszeit: 1,3-13 Tage je nach Nutzungsfrequenz</p>
          <p>• Fettlöslichkeit: THC reichert sich im Fettgewebe an</p>
          <p>• Metabolismus: Ältere Nutzer haben langsamere Elimination</p>
          <p>• Bioverfügbarkeit: Orale Aufnahme hat längere Wirkung</p>
        </div>
      </div>

      {/* Safety Tips */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="font-semibold text-green-800 mb-2">Sicherheitstipps</h3>
        <div className="space-y-1 text-sm text-green-700">
          <p>• Warten Sie im Zweifelsfall länger</p>
          <p>• Nutzen Sie bei Unsicherheit öffentliche Verkehrsmittel</p>
          <p>• Berücksichtigen Sie auch andere Faktoren (Müdigkeit, Medikamente)</p>
          <p>• Bei Fragen konsultieren Sie einen Arzt oder Anwalt</p>
        </div>
      </div>

      {/* New Calculation Options Modal */}
      {showNewCalculationOptions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full space-y-4">
            <div className="text-center">
              <Calculator className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Neue Berechnung
              </h3>
              <p className="text-gray-600">
                Möchten Sie das gleiche Profil verwenden oder ein neues erstellen?
              </p>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => handleOptionSelect(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <User className="w-5 h-5" />
                <span>Gleiches Profil verwenden</span>
              </button>
              
              <button
                onClick={() => handleOptionSelect(false)}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <User className="w-5 h-5" />
                <span>Neues Profil erstellen</span>
              </button>
              
              <button
                onClick={() => setShowNewCalculationOptions(false)}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors"
              >
                Abbrechen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 