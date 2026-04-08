import React, { useState } from 'react';
import ProfileSettings from './ProfileSettings';
import PreferencesSettings from './PreferencesSettings';
import BillingSettings from './BillingSettings';
import DangerZoneSettings from './DangerZoneSettings';
import { User, Settings, CreditCard, AlertOctagon } from 'lucide-react';

const TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'preferences', label: 'Preferences', icon: Settings },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'danger', label: 'Danger Zone', icon: AlertOctagon, className: 'text-red-500 hover:text-red-600' },
];

export default function SettingsManager({ activeTab = 'profile', onTabChange }) {
  const [internalTab, setInternalTab] = useState(activeTab);

  // Allow controlled or uncontrolled usage
  const currentTab = onTabChange ? activeTab : internalTab;
  const handleTabChange = (tabId) => {
    if (onTabChange) {
      onTabChange(tabId);
    } else {
      setInternalTab(tabId);
    }
  };

  const renderContent = () => {
    switch (currentTab) {
      case 'profile':
        return <ProfileSettings />;
      case 'preferences':
        return <PreferencesSettings />;
      case 'billing':
        return <BillingSettings />;
      case 'danger':
        return <DangerZoneSettings />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl mx-auto">
      
      {/* Sidebar Navigation */}
      <nav className="w-full md:w-64 shrink-0 space-y-2">
        {TABS.map((tab) => {
          const isActive = currentTab === tab.id;
          const Icon = tab.icon;
          
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all
                ${isActive 
                  ? 'bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20' 
                  : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]'}
                ${tab.className || ''}
              `}
            >
              <Icon size={18} className={isActive ? 'text-white' : ''} />
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 bg-[var(--bg)] rounded-3xl p-1 animate-in fade-in zoom-in-95 duration-300">
        <div className="h-full w-full">
           {renderContent()}
        </div>
      </main>

    </div>
  );
}
