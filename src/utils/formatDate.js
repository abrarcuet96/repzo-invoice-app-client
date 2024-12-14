/**
 * Utility function to format a date to the specified timezone (e.g., Asia/Dhaka).
 * Converts the date into the format: "Sat Dec 21 2024".
 *
 * @param {string} inputDate - The input date in "YYYY-MM-DD" format.
 * @param {string} [timeZone="Asia/Dhaka"] - The time zone to convert the date to.
 * @returns {string} - The formatted date string.
 */
const formatDate = (inputDate, timeZone = "Asia/Dhaka") => {
  // Parse the input date (assuming it's in YYYY-MM-DD format)
  const [year, month, day] = inputDate.split("-");
  const parsedDate = new Date(Date.UTC(year, month - 1, day)); // Month is zero-based in JavaScript

  if (isNaN(parsedDate)) {
    return "Invalid date"; // Handle invalid date
  }

  // Convert the date to the specified timezone (using toLocaleString for timezone conversion)
  const convertedDate = new Date(
    parsedDate.toLocaleString("en-US", { timeZone })
  );

  // Format the date into the desired string format (e.g., "Sat Dec 21 2024")
  const formattedDate = convertedDate.toDateString(); // "Sat Dec 21 2024"

  return formattedDate; // Return the formatted date string
};

export default formatDate;
