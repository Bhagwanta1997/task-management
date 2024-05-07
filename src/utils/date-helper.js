export const getDateDifference = (dateString1, dateString2) => {
  // Convert date strings to Date objects
  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);

  // Calculate the difference in milliseconds
  const differenceInMilliseconds = Math.abs(date2 - date1);

  // Convert milliseconds to days
  const differenceInDays = Math.ceil(
    differenceInMilliseconds / (1000 * 60 * 60 * 24)
  );

  return differenceInDays;
};