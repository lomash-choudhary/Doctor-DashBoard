/**
 * Convert 24-hour format time string to 12-hour format with AM/PM
 * @param {string} time24h - Time in 24-hour format (HH:MM)
 * @returns {string} - Time in 12-hour format with AM/PM
 */
export const formatTo12Hour = (time24h) => {
  if (!time24h) return "";
  try {
    // Parse hours and minutes
    const [hours, minutes] = time24h
      .split(":")
      .map((part) => parseInt(part, 10));

    if (isNaN(hours) || isNaN(minutes)) {
      return time24h; // Return original if parsing fails
    }

    // Convert hours to 12-hour format
    const period = hours >= 12 ? "PM" : "AM";
    const hours12 = hours % 12 || 12; // Convert 0 to 12 for 12 AM

    // Format to 12-hour time with AM/PM
    return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
  } catch (error) {
    console.error("Error formatting time:", error);
    return time24h; // Return original on error
  }
};

/**
 * Convert 12-hour format time with AM/PM to 24-hour format
 * @param {string} time12h - Time in 12-hour format with AM/PM
 * @returns {string} - Time in 24-hour format (HH:MM)
 */
export const formatTo24Hour = (time12h) => {
  if (!time12h) return "";
  try {
    // Parse the time and period
    const [timePart, period] = time12h.split(" ");
    const [hours, minutes] = timePart
      .split(":")
      .map((part) => parseInt(part, 10));

    if (isNaN(hours) || isNaN(minutes)) {
      return time12h; // Return original if parsing fails
    }

    // Convert to 24-hour format
    let hours24 = hours;
    if (period.toUpperCase() === "PM" && hours !== 12) {
      hours24 += 12;
    } else if (period.toUpperCase() === "AM" && hours === 12) {
      hours24 = 0;
    }

    // Format to 24-hour time
    return `${hours24.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  } catch (error) {
    console.error("Error formatting time to 24-hour:", error);
    return time12h; // Return original on error
  }
};
