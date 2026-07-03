export function formatDateString(dateString: string | null) {
  if (!dateString) return '';

  const [year, month, day] = dateString.split('-');

  return `${month}-${day}-${year}`;
}

export function formatToProperCase(text: string) {
  return text
    .split('-')
    .map((word) => {
      return word[0].toUpperCase() + word.slice(1);
    })
    .join(' ');
}
