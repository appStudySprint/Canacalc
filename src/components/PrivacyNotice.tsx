'use client';

import { useState } from 'react';
import { Shield, Lock, Eye, Database } from 'lucide-react';

export default function PrivacyNotice() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-green-600" />
          <h3 className="font-semibold text-gray-800">Datenschutz & DSGVO</h3>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-blue-600 hover:text-blue-700 focus:outline-none"
        >
          {isExpanded ? 'Weniger anzeigen' : 'Mehr erfahren'}
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-start space-x-2">
          <Lock className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-700">
            <strong>Lokale Datenspeicherung:</strong> Alle Daten werden nur auf Ihrem Gerät gespeichert.
          </p>
        </div>

        <div className="flex items-start space-x-2">
          <Eye className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-700">
            <strong>Keine Datenübertragung:</strong> Wir sammeln oder übertragen keine persönlichen Daten.
          </p>
        </div>

        <div className="flex items-start space-x-2">
          <Database className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-700">
            <strong>Keine Cloud-Speicherung:</strong> Ihre Daten verlassen niemals Ihr Gerät.
          </p>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
          <h4 className="font-medium text-gray-800">DSGVO-Konformität</h4>
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              • <strong>Datenminimierung:</strong> Nur die für die Berechnung notwendigen Daten werden verarbeitet
            </p>
            <p>
              • <strong>Zweckbindung:</strong> Daten werden ausschließlich für die Wartezeitberechnung verwendet
            </p>
            <p>
              • <strong>Transparenz:</strong> Sie behalten volle Kontrolle über Ihre Daten
            </p>
            <p>
              • <strong>Löschung:</strong> Daten können jederzeit durch Neuladen der Seite gelöscht werden
            </p>
          </div>

          <h4 className="font-medium text-gray-800 mt-4">Was wird gespeichert?</h4>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Ihr Profil (Alter, Gewicht, Nutzungsfrequenz)</p>
            <p>• Konsumdaten (Menge, Art, Zeitpunkt)</p>
            <p>• Berechnungsergebnisse</p>
            <p>• <em>Alles nur lokal auf Ihrem Gerät</em></p>
          </div>

          <h4 className="font-medium text-gray-800 mt-4">Was wird NICHT gespeichert?</h4>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Keine Daten in der Cloud</p>
            <p>• Keine Cookies oder Tracking</p>
            <p>• Keine Datenübertragung an Dritte</p>
            <p>• Keine Analyse- oder Werbedaten</p>
          </div>
        </div>
      )}
    </div>
  );
} 