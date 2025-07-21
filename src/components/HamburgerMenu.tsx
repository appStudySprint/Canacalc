'use client';

import { useState } from 'react';
import { Menu, X, User, History, Trash2, Plus, Settings } from 'lucide-react';
import { Profile, CalculationHistory } from '@/types';
import { StorageManager } from '@/lib/storage';

interface HamburgerMenuProps {
  onProfileSelect: (profile: Profile) => void;
  onNewProfile: () => void;
}

export default function HamburgerMenu({ onProfileSelect, onNewProfile }: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'profiles' | 'history'>('profiles');
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [history, setHistory] = useState<CalculationHistory[]>([]);

  const refreshData = () => {
    const profilesData = StorageManager.getProfiles();
    const historyData = StorageManager.getCalculationHistory();
    
    console.log('Refreshing data:', { profiles: profilesData, history: historyData });
    
    setProfiles(profilesData);
    setHistory(historyData);
  };

  const handleOpenMenu = () => {
    refreshData();
    setIsOpen(true);
  };

  const handleProfileSelect = (profile: Profile) => {
    StorageManager.setCurrentProfile(profile.id);
    onProfileSelect(profile);
    setIsOpen(false);
  };

  const handleDeleteProfile = (profileId: string) => {
    if (confirm('Möchten Sie dieses Profil und alle zugehörigen Berechnungen wirklich löschen?')) {
      StorageManager.deleteProfile(profileId);
      refreshData();
    }
  };

  const handleClearAllData = () => {
    if (confirm('Möchten Sie wirklich alle Daten löschen? Dies kann nicht rückgängig gemacht werden.')) {
      StorageManager.clearAllData();
      refreshData();
    }
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={handleOpenMenu}
        className="fixed top-4 right-4 z-50 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
      >
        <Menu className="w-6 h-6 text-gray-700" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsOpen(false)} />
      )}

      {/* Menu Panel */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Menü</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('profiles')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                activeTab === 'profiles'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                activeTab === 'history'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Verlauf
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === 'profiles' ? (
              <div className="space-y-4">
                {/* New Profile Button */}
                <button
                  onClick={() => {
                    onNewProfile();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Neues Profil</span>
                </button>

                {/* Profile List */}
                <div className="space-y-3">
                  {profiles.map((profile) => (
                    <div
                      key={profile.id}
                      className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer"
                      onClick={() => handleProfileSelect(profile)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{profile.name}</h3>
                          <p className="text-sm text-gray-500">
                            {profile.age} Jahre, {profile.weight}kg
                          </p>
                          <p className="text-xs text-gray-400">
                            {profile.frequency === 'occasional' ? 'Gelegentlich' :
                             profile.frequency === 'regular' ? 'Regelmäßig' : 'Chronisch'}
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteProfile(profile.id);
                          }}
                          className="p-1 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {profiles.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <User className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>Keine Profile vorhanden</p>
                    <p className="text-sm">Erstellen Sie Ihr erstes Profil</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {/* History List */}
                <div className="space-y-3">
                  {history.map((item) => (
                    <div
                      key={item.result.id}
                      className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer"
                      onClick={() => handleProfileSelect(item.profile)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900">{item.profile.name}</h3>
                        <span className="text-xs text-gray-500">
                          {new Date(item.result.createdAt).toLocaleDateString('de-DE')}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Konsum: {item.consumption.amount}g ({item.consumption.method === 'smoked' ? 'Geraucht' : 'Oral'})</p>
                        <p>Wartezeit: {item.result.waitHours}h</p>
                        <p className="text-xs text-gray-500">
                          Konsum: {new Date(item.consumption.timestamp).toLocaleString('de-DE')}
                        </p>
                        <p className="text-xs text-gray-500">
                          Sichere Fahrzeit: {new Date(item.result.safeDriveTime).toLocaleString('de-DE')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {history.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <History className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>Kein Verlauf vorhanden</p>
                    <p className="text-sm">Berechnungen werden hier angezeigt</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 space-y-2">
            <button
              onClick={() => {
                console.log('Debug - All data:', {
                  profiles: StorageManager.getProfiles(),
                  consumptions: StorageManager.getConsumptions(),
                  results: StorageManager.getResults(),
                  history: StorageManager.getCalculationHistory()
                });
              }}
              className="w-full flex items-center justify-center space-x-2 py-2 px-4 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>Debug (Konsole)</span>
            </button>
            <button
              onClick={handleClearAllData}
              className="w-full flex items-center justify-center space-x-2 py-2 px-4 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Alle Daten löschen</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
} 