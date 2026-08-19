import { useState } from 'react';

export function useScheduleRideViewModel() {
  const [date, setDate] = useState<Date>(new Date());

  const getDateString = () => {
    return date.toISOString().replace(/\.\d{3}Z$/, 'Z');
  };

  return {
    date,
    setDate,
    getDateString,
  };
}