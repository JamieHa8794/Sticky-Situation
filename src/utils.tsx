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
