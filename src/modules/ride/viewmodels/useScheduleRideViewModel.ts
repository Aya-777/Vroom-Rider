import { useState } from 'react';

export function useScheduleRideViewModel() {
  const [date, setDate] = useState<Date>(new Date());

  // Formatted date string in UTC
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  });

  // Time string in UTC 
  const timeString = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC',
  }).replace(/ [AP]M/, ''); 

  // AM/PM in UTC
  const hours = date.getUTCHours();
  const amPm = hours >= 12 ? 'PM' : 'AM';

  const utcIsoString = date.toISOString();

  return {
    date,
    setDate,
    formattedDate,
    timeString,
    amPm,
    utcIsoString,
  };
}