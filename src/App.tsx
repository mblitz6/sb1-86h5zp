import React from 'react';
import { Clock } from './components/Clock';
import { Clock as ClockIcon, Plus, X } from 'lucide-react';

const AVAILABLE_TIMEZONES = [
  { timezone: 'America/New_York', city: 'New York', bgImage: 'https://images.unsplash.com/photo-1490644658840-3f2e3f8c5625?auto=format&fit=crop&q=80&w=1000' },
  { timezone: 'Europe/London', city: 'London', bgImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=1000' },
  { timezone: 'Asia/Tokyo', city: 'Tokyo', bgImage: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&q=80&w=1000' },
  { timezone: 'Australia/Sydney', city: 'Sydney', bgImage: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=1000' },
  { timezone: 'Europe/Paris', city: 'Paris', bgImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=1000' },
  { timezone: 'Asia/Dubai', city: 'Dubai', bgImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1000' },
];

function App() {
  const [selectedTimezones, setSelectedTimezones] = React.useState(AVAILABLE_TIMEZONES.slice(0, 3));
  const [showMenu, setShowMenu] = React.useState(false);

  const addTimezone = (timezone: typeof AVAILABLE_TIMEZONES[0]) => {
    setSelectedTimezones([...selectedTimezones, timezone]);
    setShowMenu(false);
  };

  const removeTimezone = (index: number) => {
    setSelectedTimezones(selectedTimezones.filter((_, i) => i !== index));
  };

  const availableToAdd = AVAILABLE_TIMEZONES.filter(
    tz => !selectedTimezones.find(selected => selected.timezone === tz.timezone)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <header className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ClockIcon className="w-8 h-8" />
            <h1 className="text-2xl font-bold">World Clock</h1>
          </div>
          {availableToAdd.length > 0 && (
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add City</span>
            </button>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        {showMenu && (
          <div className="mb-8 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <h2 className="text-lg font-semibold mb-4">Add a new city</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {availableToAdd.map((tz) => (
                <button
                  key={tz.timezone}
                  onClick={() => addTimezone(tz)}
                  className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-left"
                >
                  <p className="font-medium">{tz.city}</p>
                  <p className="text-sm opacity-75">{tz.timezone}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedTimezones.map((tz, index) => (
            <div key={tz.timezone} className="relative group">
              <button
                onClick={() => removeTimezone(index)}
                className="absolute top-2 right-2 z-10 p-2 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
              <Clock {...tz} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;