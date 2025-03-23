// Base API URL - make sure it matches your backend
const API_URL = "http://localhost:4000/api/v1";

/**
 * Base API call function with authorization headers
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise<Object>} - API response
 */
const apiCall = async (endpoint, options = {}) => {
  try {
    // Ensure endpoint starts with /
    const formattedEndpoint = endpoint.startsWith("/")
      ? endpoint
      : `/${endpoint}`;

    // Add content type header if not present
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    console.log(`Making API request to: ${API_URL}${formattedEndpoint}`);

    const response = await fetch(`${API_URL}${formattedEndpoint}`, {
      ...options,
      headers,
      credentials: "include", // This is crucial for sending cookies with the request
    });

    // Log full response details
    console.log(`Response status: ${response.status}`);
    console.log(
      `Response headers:`,
      Object.fromEntries([...response.headers.entries()])
    );

    // If unauthorized, redirect to login
    if (response.status === 401 || response.status === 403) {
      console.log("Unauthorized access. Redirecting to login page...");
      window.location.href = "/login";
      throw new Error("Authentication failed");
    }

    // Special handling for 400 Bad Request
    if (response.status === 400) {
      const responseText = await response.text();
      console.error("Bad Request response:", responseText);

      // Check if the error contains "Unauthorized" or "Unauthroized"
      if (
        responseText.includes("Unauthroized") ||
        responseText.includes("Unauthorized")
      ) {
        // This is actually an auth issue from the backend
        localStorage.removeItem("doctorUsername");
        window.location.href = "/login";
        throw new Error("Authentication failed: " + responseText);
      }

      throw new Error("Bad Request: " + responseText);
    }

    // Check if the response is JSON before parsing
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.error("Non-JSON response received:", contentType);
      const responseText = await response.text();
      console.error("Response text:", responseText.substring(0, 500));
      throw new Error(`Expected JSON response but got ${contentType}`);
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  }
};

/**
 * Refresh the access token
 * @returns {Promise<boolean>} - Success status
 */
const refreshAccessToken = async () => {
  try {
    const response = await fetch(`${API_URL}/doctor/updateAccessToken`, {
      method: "PATCH",
      credentials: "include", // Include refresh token cookie
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    localStorage.setItem("accessToken", data.data);
    return true;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    return false;
  }
};

/**
 * Get doctor's full information
 * @param {string} username - Doctor's username
 * @returns {Promise<Object>} - Doctor data
 */
export const getDoctorInfo = async (username) => {
  // Note: This is specifically for debugging the unauthorized issue
  console.log("Getting doctor info for username:", username);

  try {
    return await apiCall(`/doctor/getDoctorInfo/${username}`, {
      method: "GET",
    });
  } catch (error) {
    console.error(`Failed to get doctor info for ${username}:`, error);
    throw error;
  }
};

/**
 * Update doctor's profile information
 * @param {Object} doctorData - Doctor data to update
 * @returns {Promise<Object>} - Updated doctor data
 */
export const updateDoctorProfile = async (doctorData) => {
  return apiCall("doctor/updateDoctorInfo", {
    method: "PATCH",
    body: JSON.stringify(doctorData),
  });
};

/**
 * Update doctor's avatar
 * @param {FormData} formData - Form data with avatar file
 * @returns {Promise<Object>} - Updated avatar URL
 */
export const updateDoctorAvatar = async (formData) => {
  try {
    console.log("Updating doctor avatar...");

    // Make request directly to the server without going through apiCall
    // This is needed because we're sending a FormData object, not JSON
    const response = await fetch(`${API_URL}/doctor/updateDoctorAvatar`, {
      method: "PATCH",
      credentials: "include", // Include cookies for authentication
      body: formData, // FormData will set the correct content-type with boundary
    });

    console.log("Avatar update response status:", response.status);

    // Handle non-OK responses
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Avatar update error:", errorText);
      throw new Error(`Failed to update avatar: ${errorText}`);
    }

    // Parse response as JSON
    const data = await response.json();
    console.log("Avatar update success:", data);

    return data;
  } catch (error) {
    console.error("Avatar update error:", error);
    throw error;
  }
};

/**
 * Accept a hospital request
 * @param {string} hospitalId - Hospital ID
 * @returns {Promise<Object>} - Response data
 */
export const acceptHospitalRequest = async (hospitalId) => {
  return apiCall("doctor/acceptHospitalIncomigRequest", {
    method: "POST",
    body: JSON.stringify({ hospitalId }),
  });
};

/**
 * Cancel a hospital request
 * @param {string} hospitalId - Hospital ID
 * @returns {Promise<Object>} - Response data
 */
export const cancelHospitalRequest = async (hospitalId) => {
  return apiCall("doctor/cancellingHospitalIncomigRequest", {
    method: "POST",
    body: JSON.stringify({ hospitalId }),
  });
};

/**
 * Leave a hospital
 * @param {string} hospitalId - Hospital ID
 * @returns {Promise<Object>} - Response data
 */
export const leaveHospital = async (hospitalId) => {
  return apiCall("doctor/leaveHospital", {
    method: "POST",
    body: JSON.stringify({ hospitalId }),
  });
};

/**
 * Logout doctor
 * @param {string} username - Doctor's username
 * @returns {Promise<Object>} - Response data
 */
export const logoutDoctor = async (username) => {
  const result = await apiCall(`doctor/logout/${username}`, {
    method: "PATCH",
  });

  // Clear only localStorage - the backend will handle clearing cookies
  localStorage.removeItem("doctorUsername");

  return result;
};

/**
 * Add a time slot for a doctor using the addTimeSlot endpoint
 * @param {Object} timeSlotData - Time slot data to add
 * @returns {Promise<Object>} - Response data
 */
export const addDoctorTimeSlot = async (timeSlotData) => {
  try {
    // Format the data to match the backend API expectations
    const formattedData = {
      timeSlotToBeAdded: {
        dayName: timeSlotData.dayName,
        slots: timeSlotData.slots,
      },
    };

    // Call the correct API endpoint
    return await apiCall("doctor/addTimeSlot", {
      method: "PATCH",
      body: JSON.stringify(formattedData),
    });
  } catch (error) {
    // Transform error message to a user-friendly version
    let errorMessage = "Failed to add time slot.";

    if (error.message.includes("overlaps with existing time slot")) {
      errorMessage =
        "This time conflicts with another scheduled slot. Please choose a different time.";
    } else if (error.message.includes("Doctor not found")) {
      errorMessage =
        "Your profile information could not be found. Please log in again.";
    } else if (error.message.includes("Validation failed")) {
      errorMessage =
        "The time slot information is not valid. Please check all fields.";
    }

    throw new Error(errorMessage);
  }
};

/**
 * Update an existing time slot
 * @param {Object} updateData - Data for updating the time slot
 * @returns {Promise<Object>} - Response data
 */
export const updateDoctorTimeSlot = async (updateData) => {
  try {
    // Format the data to match the backend API expectations
    const formattedData = {
      timeSlotToBeUpdated: {
        dayName: updateData.dayName,
        slots: updateData.slots,
      },
    };

    return await apiCall("doctor/updateTimeSlot", {
      method: "PATCH",
      body: JSON.stringify(formattedData),
    });
  } catch (error) {
    // Transform error message to a user-friendly version
    let errorMessage = "Failed to update time slot.";

    if (error.message.includes("There is not timeslot avaiable")) {
      errorMessage =
        "This time slot no longer exists. It may have been deleted.";
    } else if (error.message.includes("Doctor not found")) {
      errorMessage =
        "Your profile information could not be found. Please log in again.";
    } else if (error.message.includes("Something went wrong while finding")) {
      errorMessage = "We couldn't find the time slot you're trying to update.";
    }

    throw new Error(errorMessage);
  }
};

/**
 * Delete a time slot
 * @param {Object} deleteData - Data identifying the time slot to delete
 * @returns {Promise<Object>} - Response data
 */
export const deleteDoctorTimeSlot = async (deleteData) => {
  try {
    // Format the data to match the backend API expectations
    const formattedData = {
      timeSlotToBeDeleted: {
        dayName: deleteData.dayName,
        slots: deleteData.slots,
      },
    };

    return await apiCall("doctor/deleteTimeSlot", {
      method: "PATCH",
      body: JSON.stringify(formattedData),
    });
  } catch (error) {
    // Transform error message to a user-friendly version
    let errorMessage = "Failed to delete time slot.";

    if (error.message.includes("Time slot with start time")) {
      errorMessage =
        "We couldn't find this time slot. It may have already been deleted.";
    } else if (error.message.includes("There is not timeslot avaiable")) {
      errorMessage = "No time slots exist for this day.";
    } else if (error.message.includes("Doctor not found")) {
      errorMessage =
        "Your profile information could not be found. Please log in again.";
    }

    throw new Error(errorMessage);
  }
};

/**
 * Get stored time slots from localStorage (temporary solution)
 * @returns {Array} - Array of time slots
 */
export const getLocalTimeSlots = () => {
  const username = localStorage.getItem("doctorUsername");
  if (!username) return [];

  return JSON.parse(localStorage.getItem(`${username}_timeSlots`) || "[]");
};
