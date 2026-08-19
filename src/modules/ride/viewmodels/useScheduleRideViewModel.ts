import { useMemo, useState } from 'react';

export function useScheduleRideViewModel() {
  const minimumDate = useMemo(() => {
    return new Date(Date.now() + 35 * 60 * 1000);
  }, []);

  const [date, setDate] = useState<Date>(minimumDate);

  const getDateString = () => {
    return date.toISOString().replace(/\.\d{3}Z$/, 'Z');
  };

  return {
    date,
    setDate,
    minimumDate,
    getDateString,
  };
}