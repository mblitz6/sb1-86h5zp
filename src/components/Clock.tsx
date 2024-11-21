import React from 'react';
import { format } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { Globe2 } from 'lucide-react';

interface ClockProps {
  timezone: string;
  city: string;
  bgImage: string;
}

export function Clock({ timezone, city, bgImage }: ClockProps) {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = formatInTimeZone(time, timezone, 'HH:mm:ss');
  const formattedDate = formatInTimeZone(time, timezone, 'EEEE, MMMM d');

  return (
    <div className="relative overflow-hidden rounded-xl shadow-lg group">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      <div className="relative p-6 text-white">
        <div className="flex items-center gap-2 mb-4">
          <Globe2 className="w-5 h-5" />
          <h2 className="text-xl font-semibold">{city}</h2>
        </div>
        <div className="space-y-1">
          <p className="text-4xl font-bold tracking-wider">{formattedTime}</p>
          <p className="text-sm opacity-90">{formattedDate}</p>
          <p className="text-xs opacity-75">{timezone}</p>
        </div>
      </div>
    </div>
  );
}