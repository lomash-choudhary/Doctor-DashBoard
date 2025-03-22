"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function ApiDocumentation() {
  const [activeTab, setActiveTab] = useState("endpoints");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <i className="fas fa-code text-emerald-600 text-2xl mr-2"></i>
              <h1 className="text-xl font-semibold text-gray-800">
                API Documentation
              </h1>
            </div>
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              <i className="fas fa-times"></i>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="flex border-b">
            <button
              className={`px-4 py-2 font-medium text-sm focus:outline-none ${
                activeTab === "endpoints"
                  ? "text-emerald-600 border-b-2 border-emerald-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("endpoints")}
            >
              API Endpoints
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm focus:outline-none ${
                activeTab === "models"
                  ? "text-emerald-600 border-b-2 border-emerald-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("models")}
            >
              Data Models
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm focus:outline-none ${
                activeTab === "test"
                  ? "text-emerald-600 border-b-2 border-emerald-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("test")}
            >
              Test API
            </button>
          </div>

          <div className="p-6">
            {activeTab === "endpoints" && (
              <div>
                <h2 className="text-lg font-semibold mb-4">
                  Available Endpoints
                </h2>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Endpoint
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Method
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-900">
                          /doctor/getDoctorInfo/:username
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs">
                            GET
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          Get doctor profile information
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Working
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-900">
                          /doctor/addDoctorTimeSlot
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs">
                            POST
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          Add a new time slot for doctor
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Working
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-900">
                          /doctor/updateTimeSlot
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs">
                            POST
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          Update existing time slot for doctor
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Untested
                          </span>
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td
                          colSpan="4"
                          className="px-6 py-4 text-sm text-gray-500 italic"
                        >
                          Contact backend developer team to get the correct
                          endpoint for time slot management.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-8 bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-blue-800 font-medium">For Developers</h3>
                  <p className="text-sm text-blue-600 mt-1">
                    When testing new endpoints, use the Advanced Settings in the
                    Time Slot modal to specify a custom endpoint path.
                  </p>
                </div>

                <div className="mt-8 bg-amber-50 p-4 rounded-lg">
                  <h3 className="text-amber-800 font-medium">
                    Backend in Development
                  </h3>
                  <p className="text-sm text-amber-700 mt-1">
                    The time slot endpoints are still under development by the
                    backend team. Currently, the application is using browser
                    local storage to temporarily store time slots.
                  </p>
                  <div className="mt-3 flex space-x-2">
                    <button
                      onClick={() => {
                        const username = localStorage.getItem("doctorUsername");
                        localStorage.removeItem(`${username}_timeSlots`);
                        window.location.reload();
                      }}
                      className="px-3 py-1 bg-red-100 text-red-700 text-xs rounded hover:bg-red-200"
                    >
                      Clear Local Time Slots
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "models" && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Data Models</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-md font-medium text-gray-800 mb-2">
                      Time Slot Structure
                    </h3>
                    <div className="bg-gray-50 p-4 rounded font-mono text-sm overflow-x-auto">
                      <pre>
                        {JSON.stringify(
                          {
                            timeSlotToBeAdded: {
                              dayName: "Monday",
                              slots: [
                                {
                                  startTime: "09:00",
                                  endTime: "17:00",
                                  maxPatientsInTheSlot: 1,
                                  status: "ACTIVE",
                                  recurring: true,
                                  exceptions: [
                                    {
                                      expectedDateOfException: "2024-03-25",
                                      status: "DAY_OFF"
                                    }
                                  ]
                                },
                              ],
                            }
                          },
                          null,
                          2
                        )}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-md font-medium text-gray-800 mb-2">
                      Doctor Profile Structure
                    </h3>
                    <div className="bg-gray-50 p-4 rounded font-mono text-sm overflow-x-auto">
                      <pre>
                        {JSON.stringify(
                          {
                            username: "doctoruser",
                            name: "Dr. Name",
                            email: "doctor@example.com",
                            specialization: "Cardiology",
                            licenseNumber: "ABC123456",
                            yearsOfExperience: 5,
                            consultationFee: 500,
                            averageConsultationTime: 30,
                            timeSlots: [
                              {
                                dayName: "Monday",
                                slots: [
                                  {
                                    startTime: "09:00",
                                    endTime: "12:00",
                                    maxPatientsInTheSlot: 3,
                                    status: "ACTIVE",
                                    recurring: true,
                                  },
                                ],
                              },
                            ],
                          },
                          null,
                          2
                        )}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "test" && (
              <div>
                <h2 className="text-lg font-semibold mb-4">
                  Test API Endpoints
                </h2>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <i className="fas fa-exclamation-triangle text-yellow-400"></i>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        This feature is for development purposes only. Use the
                        console network tab to see detailed API responses.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      API Endpoint
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        http://localhost:4000/api/v1
                      </span>
                      <input
                        type="text"
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                        placeholder="/doctor/timeSlots"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Request Body
                    </label>
                    <div className="mt-1">
                      <textarea
                        rows={10}
                        className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border border-gray-300 rounded-md font-mono"
                        placeholder={`{\n  "timeSlots": [...]\n}`}
                      ></textarea>
                    </div>
                  </div>

                  <div>
                    <button className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                      Send Request
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
