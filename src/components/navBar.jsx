import React, { useState, useRef, useEffect } from "react";

export default function NavBar({
  isAuthenticated,
  doctorProfile,
  setShowProfileModal,
  onLogout,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <i className="fas fa-heartbeat text-emerald-600 text-2xl mr-2"></i>
            <span className="text-xl font-semibold text-gray-800">
              Doctor Dashboard
            </span>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <button className="text-gray-600 hover:text-blue-600">
                  <i className="fas fa-bell text-xl"></i>
                </button>
                <div className="relative">
                  <button
                    ref={buttonRef}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    className="flex items-center hover:bg-gray-50 rounded-lg p-2"
                  >
                    <img
                      src={
                        doctorProfile?.doctorAvatarURL || "/default-avatar.png"
                      }
                      alt="Doctor profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="ml-2 text-gray-800">
                      {doctorProfile?.name || "Doctor"}
                    </span>
                    <i className="fas fa-chevron-down ml-2 text-gray-500"></i>
                  </button>

                  {/* Dropdown menu */}
                  {isDropdownOpen && (
                    <div
                      ref={dropdownRef}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50"
                      onMouseEnter={() => setIsDropdownOpen(true)}
                      onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                      <div className="py-1">
                        <button
                          onClick={() => {
                            setShowProfileModal(true);
                            setIsDropdownOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <i className="fas fa-user mr-2"></i> Profile
                        </button>
                        <button
                          onClick={() => {
                            onLogout();
                            setIsDropdownOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <i className="fas fa-sign-out-alt mr-2"></i> Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition duration-300 !rounded-button whitespace-nowrap"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
