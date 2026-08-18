import { useEffect, useMemo, useRef, useState } from 'react';

export const WHEEL_ITEM_HEIGHT = 48;

export function useScheduleRideViewModel() {
  const [selectedIndexDate, setSelectedIndexDate] = useState(0);
  const [selectedIndexHour, setSelectedIndexHour] = useState(0);
  const [selectedIndexMinute, setSelectedIndexMinute] = useState(0);
  const [selectedIndexAmPm, setSelectedIndexAmPm] = useState(0);
  const [scheduleError, setScheduleError] = useState<string | null>(null);
  const previousAmPmRef = useRef(selectedIndexAmPm);


  // Keep the actual dates separately (7 days)
  const dateValues = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() + i);

      return date;
    });
  }, []);

  // Display values for the wheel
  const dates = useMemo(() => {
    return dateValues.map((date, i) =>
      i === 0
        ? 'Today'
        : date.toLocaleDateString('en-US', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
          }),
    );
  }, [dateValues]);

  const hours = useMemo(
    () =>
      Array.from(
        { length: 12 },
        (_, i) => String(i + 1).padStart(2, '0'),
      ),
    [],
  );

  const minutes = useMemo(
    () =>
      Array.from(
        { length: 12 },
        (_, i) => String(i * 5).padStart(2, '0'),
      ),
    [],
  );

  const amPmOptions = ['AM', 'PM'];


//   const scheduledAt = useMemo(() => {
//     if (!dateValues[selectedIndexDate]) {
//       return null;
//     }

//     let hour = Number(hours[selectedIndexHour]);

//     // Convert 12-hour time → 24-hour time
//     if (amPmOptions[selectedIndexAmPm] === 'AM') {
//       if (hour === 12) {
//         hour = 0;
//       }
//     } else {
//       if (hour !== 12) {
//         hour += 12;
//       }
//     }
//     dateValues[selectedIndexDate].setHours(hour);

//     const result = new Date(dateValues[selectedIndexDate]);

//     result.setHours(
//       hour,
//       Number(minutes[selectedIndexMinute]),
//       0,
//       0,
//     );

//     return result;
//   }, [
//     selectedIndexDate,
//     selectedIndexHour,
//     selectedIndexMinute,
//     selectedIndexAmPm,
//   ]);

//   /**
//    * Validate and auto-advance the date if the selected time has passed
//    * (e.g., selecting 12:00 AM on 'Today' when it's already past midnight).
//    */
//   useEffect(() => {
//   if (!scheduledAt) {
//     setScheduleError(null);
//     return;
//   }

//   const previousAmPm = previousAmPmRef.current;

//   // PM → AM means we crossed midnight
//   const crossedMidnight =
//     previousAmPm === 1 &&
//     selectedIndexAmPm === 0;

//   if (crossedMidnight) {
//     setSelectedIndexDate(prev => {
//       if (prev >= dateValues.length - 1) {
//         return prev;
//       }

//       return prev + 1;
//     });
//   }

//   // Remember the current AM/PM for the next change
//   previousAmPmRef.current = selectedIndexAmPm;

//   // Validate
//   const now = new Date();

//   if (scheduledAt <= now) {
//     setScheduleError(
//       'Please select a time in the future.',
//     );
//   } else {
//     setScheduleError(null);
//   }
// }, [
//   scheduledAt,
//   selectedIndexAmPm,
//   dateValues.length,
// ]);

  return {
    dates,
    hours,
    minutes,
    amPmOptions,

    selectedIndexDate,
    selectedIndexHour,
    selectedIndexMinute,
    selectedIndexAmPm,

    // selectedDate,
    // scheduledAt,
    // scheduleError,

    setSelectedIndexHour,
    setSelectedIndexMinute,
    setSelectedIndexAmPm,
    setSelectedIndexDate,
  };
}