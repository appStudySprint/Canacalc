'use client';

import { format, formatDistanceToNow } from 'date-fns';
import { de } from 'date-fns/locale';
import { Car, Clock, AlertCircle, CheckCircle } from 'lucide-react';

interface ResultCardProps {
  result: {
    safeDriveTime: Date;
    waitHours: number;
    explanation: string;
  };
}

export default function ResultCard({ result }: ResultCardProps) {
  const { safeDriveTime, waitHours, explanation } = result;
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

  return (
    <div className="space-y-4">
      {/* Status Card */}
      <div className={`border rounded-lg p-4 ${getStatusColor()}`}>
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <span className="font-semibold">{getStatusText()}</span>
        </div>
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
            Konservativ berechnet für maximale Sicherheit
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
            • <strong>Empfohlener Sicherheitswert:</strong> Unter 1,0 ng/mL
          </p>
          <p>
            • <strong>Konservative Berechnung:</strong> Berücksichtigt individuelle Faktoren
          </p>
          <p>
            • <strong>Keine Garantie:</strong> Diese Berechnung ersetzt keine rechtliche Beratung
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
    </div>
  );
} 