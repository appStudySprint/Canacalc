'use client';

import { format, formatDistanceToNow } from 'date-fns';
import { de } from 'date-fns/locale';
import { Info, AlertTriangle, Clock } from 'lucide-react';
import { calculateInformationalTime } from '@/lib/thcCalculator';
import { Profile, Consumption } from '@/types';

interface InformationalCardProps {
  profile: Profile | null;
  consumption: Consumption | null;
}

export default function InformationalCard({ profile, consumption }: InformationalCardProps) {
  if (!profile || !consumption) {
    return null;
  }

  const informationalHours = calculateInformationalTime(
    profile.age,
    profile.weight,
    profile.frequency,
    consumption.amount,
    consumption.method
  );

  const informationalTime = new Date(consumption.timestamp);
  informationalTime.setHours(informationalTime.getHours() + informationalHours);

  const now = new Date();
  const isBelow25 = now >= informationalTime;
  const days = Math.floor(informationalHours / 24);
  const hours = informationalHours % 24;

  return (
    <div className="ios-card p-6 border-l-4 border-blue-500">
      <div className="flex items-center space-x-2 mb-4">
        <Info className="ios-icon text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Informationswert: 2,5 ng/mL</h3>
      </div>

      <div className="space-y-4">
        {/* Time Display */}
        <div className="flex items-center space-x-2">
          <Clock className="ios-icon text-blue-600" />
          <div>
            <p className="text-sm text-gray-600">
              <strong>Informationszeitpunkt:</strong>
            </p>
            <p className="text-lg font-semibold text-blue-600">
              {format(informationalTime, "dd.MM.yyyy 'um' HH:mm", { locale: de })}
            </p>
            <p className="text-sm text-gray-500">
              ({informationalHours} Stunden = {days > 0 ? `${days} Tag${days > 1 ? 'en' : ''} und ` : ''}{hours} Stunden)
            </p>
          </div>
        </div>

        {/* Status */}
        <div className={`ios-status inline-block ${isBelow25 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
          {isBelow25 
            ? 'Unter 2,5 ng/mL (informativ)' 
            : 'Noch über 2,5 ng/mL (informativ)'
          }
        </div>

        {/* Legal Disclaimer */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="ios-icon text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-red-800 mb-1">⚠️ Wichtiger Hinweis</h4>
              <div className="space-y-2 text-sm text-red-700">
                <p>
                  <strong>Dies ist nur ein Informationswert!</strong> Diese Berechnung zeigt, wann THC-Werte 
                  möglicherweise unter 2,5 ng/mL fallen könnten.
                </p>
                <p>
                  <strong>NICHT für die Fahrplanung verwenden!</strong> Der deutsche Gesetzgeber definiert 
                  einen Grenzwert von 3,5 ng/mL, aber wir empfehlen den konservativen Wert von unter 0,1 ng/mL.
                </p>
                <p>
                  <strong>Keine rechtliche Garantie:</strong> Diese Berechnung basiert auf Schätzungen und 
                  garantiert keine rechtliche Sicherheit. Bei Unsicherheit warten Sie länger.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scientific Context */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">Wissenschaftlicher Kontext</h4>
          <div className="space-y-1 text-sm text-blue-700">
            <p>• <strong>Deutscher Grenzwert:</strong> 3,5 ng/mL THC im Serum (§24a StVG)</p>
            <p>• <strong>Informationswert:</strong> 2,5 ng/mL (näher am Grenzwert)</p>
            <p>• <strong>Empfohlener Sicherheitswert:</strong> Unter 0,1 ng/mL</p>
            <p>• <strong>Individuelle Faktoren:</strong> Metabolismus, Körperfett, Nutzungsfrequenz</p>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-2">Rechtlicher Haftungsausschluss</h4>
          <div className="space-y-1 text-xs text-gray-600">
            <p>• Diese Anwendung dient nur zu Informationszwecken</p>
            <p>• Keine rechtliche Beratung oder Garantie</p>
            <p>• Bei rechtlichen Fragen konsultieren Sie einen Anwalt</p>
            <p>• Der Nutzer trägt die volle Verantwortung für seine Entscheidungen</p>
            <p>• Die Entwickler übernehmen keine Haftung für Schäden oder rechtliche Konsequenzen</p>
          </div>
        </div>
      </div>
    </div>
  );
} 