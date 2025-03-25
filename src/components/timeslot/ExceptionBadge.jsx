import React from "react";

export default function ExceptionBadge({ exception, compact = false }) {
  // Format the date for display
  const formatDate = (dateString) => {
    try {
      // Handle ISO date format from backend
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        console.error("Invalid date:", dateString);
        return "Invalid date";
      }

      if (compact) {
        // More compact format for profile view: "Jan 25"
        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
      }

      // Fuller format for main schedule: "Jan 25, 2023"
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch (e) {
      console.error("Error formatting date:", e);
      return dateString || "N/A";
    }
  };

  // Get day of week from date
  const getDayOfWeek = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", { weekday: "long" });
    } catch (e) {
      return "";
    }
  };

  // Get icon based on exception status
  const getExceptionIcon = (status) => {
    switch (status) {
      case "DAY_OFF":
        return "fa-home";
      case "HOLIDAY":
        return "fa-gift";
      case "LEAVE":
        return "fa-suitcase";
      default:
        return "fa-calendar-times";
    }
  };

  // Get background color based on how soon the exception is
  const getBgColor = () => {
    try {
      const exceptionDate = new Date(exception.expectedDateOfException);
      const today = new Date();
      const diffDays = Math.floor(
        (exceptionDate - today) / (1000 * 60 * 60 * 24)
      );

      // If the exception is within the next 7 days, use a brighter red
      if (diffDays <= 7) {
        return "bg-red-100";
      }

      // If it's more than 7 days away, use a softer red
      return "bg-red-50";
    } catch (e) {
      return "bg-red-50";
    }
  };

  // If no exception data, don't render
  if (!exception || !exception.expectedDateOfException) {
    console.warn("Missing exception data or date:", exception);
    return null;
  }

  const dayOfWeek = getDayOfWeek(exception.expectedDateOfException);

  // Log this exception for debugging
  console.log(
    `Rendering exception badge for date: ${exception.expectedDateOfException}, status: ${exception.status}`
  );

  return (
    <div
      className={`${getBgColor()} text-red-600 rounded-full px-2 py-0.5 text-xs flex items-center group relative`}
      title={`Exception: ${
        exception.status?.replace(/_/g, " ").toLowerCase() || "Unavailable"
      }`}
    >
      <i className={`fas ${getExceptionIcon(exception.status)} mr-1`}></i>
      {formatDate(exception.expectedDateOfException)}

      {/* Tooltip that appears on hover with detailed exception info */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10 min-w-40 w-max">
        <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 shadow-lg">
          <p className="font-semibold">
            {exception.status?.replace(/_/g, " ") || "Unavailable"}
          </p>
          <p>{formatDate(exception.expectedDateOfException)}</p>
          <p className="text-gray-300">{dayOfWeek}</p>
        </div>
        <div className="w-2 h-2 bg-gray-800 transform rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
      </div>
    </div>
  );
}
