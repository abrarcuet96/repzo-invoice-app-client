import React from "react";

/**
 * Utility component to format a date to the specified timezone (e.g., Asia/Dhaka).
 * Converts the date into the format: "Sat Dec 21 2024".
 */
const DateFormatter = ({ date, timeZone = "Asia/Dhaka" }) => {
  const formatDate = (inputDate) => {
    const [year, month, day] = inputDate.split("-");
    const parsedDate = new Date(Date.UTC(year, month - 1, day));
    console.log("Parsed Date:", parsedDate);

    const convertedDate = new Date(
      parsedDate.toLocaleString("en-US", { timeZone })
    );
    console.log("Converted Date:", convertedDate);

    const formattedDate = convertedDate.toDateString();
    console.log("Formatted Date:", formattedDate);

    return formattedDate;
  };

  // Return the formatted date wrapped in a span element
  return <span>{formatDate(date)}</span>;
};

export default DateFormatter;
