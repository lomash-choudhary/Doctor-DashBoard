/**
 * Format API error messages to be more user-friendly
 * @param {Error} error - The original error object
 * @param {string} context - The context where the error occurred
 * @returns {string} - Formatted error message
 */
export const formatApiError = (error, context = "") => {
  // If there's no error message, provide a generic one
  if (!error || !error.message) {
    return `An unexpected error occurred${context ? ` while ${context}` : ""}.`;
  }

  const errorMessage = error.message;

  // Handle common time slot errors
  if (
    context === "adding time slot" ||
    context === "updating time slot" ||
    context === "deleting time slot"
  ) {
    // Handle time slot overlap errors
    if (errorMessage.includes("overlaps with existing time slot")) {
      return "This time slot conflicts with another time slot. Please choose different hours.";
    }

    // Handle no time slot found errors
    if (
      errorMessage.includes("Time slot with start time") ||
      errorMessage.includes("not found") ||
      errorMessage.includes("There is not timeslot avaiable")
    ) {
      return "The time slot was not found. It may have been deleted or modified by another session.";
    }

    // Handle doctor not found errors
    if (errorMessage.includes("Doctor not found")) {
      return "Your doctor profile could not be accessed. Please try logging in again.";
    }

    // Handle validation errors
    if (
      errorMessage.includes("validation failed") ||
      errorMessage.includes("Validation failed")
    ) {
      if (errorMessage.includes("endTime must be after startTime")) {
        return "End time must be after start time.";
      }
      if (errorMessage.includes("maxPatientsInTheSlot")) {
        return "Patient capacity must be a positive number.";
      }
      return "Please check your input data. Some values are not valid.";
    }
  }

  // Handle authentication errors
  if (
    errorMessage.includes("Authentication failed") ||
    errorMessage.includes("Unauthorized") ||
    errorMessage.includes("Unauthroized")
  ) {
    return "Your session has expired. Please log in again.";
  }

  // Parse validation errors from backend
  if (
    errorMessage.includes("validation error") ||
    errorMessage.includes("Validation error")
  ) {
    try {
      // Try to extract the validation messages
      const validationMatch = errorMessage.match(/\[(.*?)\]/);
      if (validationMatch) {
        const validationErrors = JSON.parse(validationMatch[0]);
        if (Array.isArray(validationErrors) && validationErrors.length > 0) {
          return `Validation error: ${validationErrors[0].message}`;
        }
      }
    } catch (e) {
      console.error("Error parsing validation message:", e);
    }
  }

  // For network errors
  if (
    errorMessage.includes("Failed to fetch") ||
    errorMessage.includes("NetworkError") ||
    errorMessage.includes("Network request failed")
  ) {
    return "Unable to connect to the server. Please check your internet connection.";
  }

  // For server errors
  if (
    errorMessage.includes("500") ||
    errorMessage.includes("Internal Server Error")
  ) {
    return "The server encountered an error. Please try again later.";
  }

  // For database errors
  if (
    errorMessage.includes("duplicate key") ||
    errorMessage.includes("already exists")
  ) {
    return "This resource already exists. Please try a different input.";
  }

  // For default fallback, clean up any JSON or code snippets
  return errorMessage
    .replace(/\{.*?\}/g, "") // Remove JSON objects
    .replace(/\[.*?\]/g, "") // Remove arrays
    .replace(/([A-Z][a-z]*Error:)/g, "") // Remove error type labels
    .replace(/Error:/gi, "") // Remove "Error:" text
    .trim();
};
