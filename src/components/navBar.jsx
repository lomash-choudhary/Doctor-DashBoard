export default function NavBar({
  isAuthenticated,
  doctorProfile,
  setShowProfileModal,
  setShowLoginModal,
}) {
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
                    onClick={() => setShowProfileModal(true)}
                    className="flex items-center hover:bg-gray-50 rounded-lg p-2"
                  >
                    <img
                      src={doctorProfile.image}
                      alt="Doctor profile"
                      className="w-10 h-10 rounded-full"
                    />
                    <span className="ml-2 text-gray-800">
                      {doctorProfile.name}
                    </span>
                    <i className="fas fa-chevron-down ml-2 text-gray-500"></i>
                  </button>
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
