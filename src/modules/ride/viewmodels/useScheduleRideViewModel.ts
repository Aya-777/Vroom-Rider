import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  DateItem,
  ScheduleSelection,
} from '../types/schedule.types';

const DATE_COUNT = 30;

export const WHEEL_ITEM_HEIGHT = 48;

export function useScheduleRideViewModel(
  onContinue: (selection: ScheduleSelection) => void,
) {
  const [selectedDateIndex, setSelectedDateIndex] =
    useState(0);

  const [selectedHourIndex, setSelectedHourIndex] =
    useState(0);

  const [selectedMinuteIndex, setSelectedMinuteIndex] =
    useState(0);

  const [selectedPeriodIndex, setSelectedPeriodIndex] =
    useState(0);

  const dates = useMemo<DateItem[]>(() => {
    return Array.from(
      { length: DATE_COUNT },
      (_, index) => {
        const date = new Date();

        date.setHours(0, 0, 0, 0);
        date.setDate(
          date.getDate() + index,
        );

        let label = '';

        if (index === 0) {
          label = 'Today';
        } else if (index === 1) {
          label = 'Tomorrow';
        } else {
          label = date.toLocaleDateString(
            'en-US',
            {
              weekday: 'short',
            },
          );
        }

        return {
          date,
          label,
          subLabel: date.toLocaleDateString(
            'en-US',
            {
              month: 'short',
              day: 'numeric',
            },
          ),
        };
      },
    );
  }, []);

  const hours = useMemo(
    () =>
      Array.from(
        { length: 12 },
        (_, index) => ({
          value: String(index + 1),
          label: String(index + 1).padStart(2, '0'),
        }),
      ),
    [],
  );

  const minutes = useMemo(
    () =>
      Array.from(
        { length: 12 },
        (_, index) => {
          const minute = index * 5;

          return {
            value: String(minute),
            label: String(minute).padStart(2, '0'),
          };
        },
      ),
    [],
  );

  const periods = useMemo(
    () => [
      {
        value: 'AM',
        label: 'AM',
      },
      {
        value: 'PM',
        label: 'PM',
      },
    ],
    [],
  );

  const selectedDate =
    dates[selectedDateIndex]?.date;

  const selectedHour =
    Number(hours[selectedHourIndex]?.value ?? 12);

  const selectedMinute =
    Number(
      minutes[selectedMinuteIndex]?.value ?? 0,
    );

  const selectedPeriod =
    periods[selectedPeriodIndex]?.value ?? 'AM';

  const scheduledAt = useMemo(() => {
    if (!selectedDate) {
      return null;
    }

    let hour = selectedHour;

    if (selectedPeriod === 'AM') {
      if (hour === 12) {
        hour = 0;
      }
    } else {
      if (hour !== 12) {
        hour += 12;
      }
    }

    const result = new Date(selectedDate);

    result.setHours(
      hour,
      selectedMinute,
      0,
      0,
    );

    return result;
  }, [
    selectedDate,
    selectedHour,
    selectedMinute,
    selectedPeriod,
  ]);

  /**
   * When today is selected, automatically make sure
   * the selected time isn't already in the past.
   */
  useEffect(() => {
    if (!scheduledAt) {
      return;
    }

    const now = new Date();

    if (
      selectedDate?.toDateString() ===
        now.toDateString() &&
      scheduledAt <= now
    ) {
      // Round current time up to next 5 minutes.
      const roundedMinutes =
        Math.ceil(
          (now.getMinutes() + 1) / 5,
        ) * 5;

      let hour = now.getHours();
      let minute = roundedMinutes;

      if (minute >= 60) {
        hour += 1;
        minute = 0;
      }

      const isPM = hour >= 12;

      let displayHour = hour % 12;

      if (displayHour === 0) {
        displayHour = 12;
      }

      const hourIndex =
        displayHour - 1;

      const minuteIndex =
        Math.floor(minute / 5);

      const periodIndex =
        isPM ? 1 : 0;

      setSelectedHourIndex(
        Math.min(hourIndex, 11),
      );

      setSelectedMinuteIndex(
        Math.min(minuteIndex, 11),
      );

      setSelectedPeriodIndex(
        periodIndex,
      );
    }
  }, [selectedDateIndex]);

  const handleContinue = useCallback(() => {
    if (!selectedDate || !scheduledAt) {
      return;
    }

    onContinue({
      date: selectedDate,
      time: scheduledAt,
      scheduledAt,
    });
  }, [
    selectedDate,
    scheduledAt,
    onContinue,
  ]);

  return {
    dates,

    hours,
    minutes,
    periods,

    selectedDateIndex,
    selectedHourIndex,
    selectedMinuteIndex,
    selectedPeriodIndex,

    selectedDate,
    scheduledAt,

    setSelectedDateIndex,
    setSelectedHourIndex,
    setSelectedMinuteIndex,
    setSelectedPeriodIndex,

    handleContinue,
  };
}