export function formatDateString(dateString: string | null) {
  if (!dateString) return '';

  const formattedDate = new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return formattedDate;
}

export function formatToProperCase(text: string) {
  return text
    .split('-')
    .map((word) => {
      return word[0].toUpperCase() + word.slice(1);
    })
    .join(' ');
}

export function getChangedFields<T extends object>(
  initialValues: T,
  currentValues: T,
): Partial<T> {
  const updates: Partial<T> = {};
  const keys = Object.keys(currentValues) as Array<keyof T>;
  keys.forEach((key) => {
    if (initialValues[key] !== currentValues[key]) {
      updates[key] = currentValues[key];
    }
  });

  return updates;
}
