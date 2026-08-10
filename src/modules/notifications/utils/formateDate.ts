export function formatNotificationDateTime(isoString: string): {
  date: string;
  time: string;
} {
  const d = new Date(isoString);

  const date = d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }); 

  const time = d.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }); 

  return { date, time };
}
