function addDaysToDate(days: number): Date {
  const date: Date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

export { addDaysToDate };
