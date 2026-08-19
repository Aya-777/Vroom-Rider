import { useState } from 'react';

export function useScheduleRideViewModel() {
  const [date, setDate] = useState<Date>(new Date());

  return {
    date,
    setDate,
  };
}