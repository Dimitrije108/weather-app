// Extract day of the week from Weather API date (e.g. Sun)
const extractDay = (date) => {
  const convertedDate = new Date(date);
  const dayOption = { weekday: 'short' };
  return convertedDate.toLocaleDateString(undefined, dayOption);
};
// Convert the date received from Weather API into a
// locale format of a day and a month (e.g. 6/30)
const convertDate = (date) => {
  const convertedDate = new Date(date);
  const dateOptions = { day: 'numeric', month: 'numeric' };
  const userLocale = navigator.language || 'en-US';
  return convertedDate.toLocaleDateString(userLocale, dateOptions);
};

export { extractDay, convertDate };
