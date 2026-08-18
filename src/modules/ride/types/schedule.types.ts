export interface ScheduleSelection {
  date: Date;
  time: Date;
  scheduledAt: Date;
}

export interface DateItem {
  date: Date;
  label: string;
  subLabel: string;
}

export interface TimeItem {
  date: Date;
  label: string;
}