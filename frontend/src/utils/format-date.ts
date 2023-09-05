/**
 * Convert a date string to a readable date format.
 * @param {string} dateString - The date string to convert.
 * @param {string} format - The desired date format (e.g., 'dd-mm-yy', 'mm/dd/yyyy').
 * @returns {string} - The formatted date string.
 */
export const formatDate = (
  dateString: string,
  format: string = "mm/dd/yyyy"
): string => {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: format.includes("yyyy") ? "numeric" : undefined,
    month: format.includes("mm") ? "2-digit" : undefined,
    day: format.includes("dd") ? "2-digit" : undefined,
  };

  return date.toLocaleDateString("en-US", options);
};

// Example usage:
//   const originalDate: string = "2023-09-05T14:39:29.757Z";
//   const formattedDate: string = formatDate(originalDate, "dd-mm-yy");
//   console.log(formattedDate); // Output: "05-09-23"
