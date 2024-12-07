/* eslint-disable react/prop-types */
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { createLeaveRequest } from "../../api/leaveApi";

const LeaveRequestForm = ({ closeModal, onLeaveAdded }) => {
  const { auth } = useAuth();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!startDate || !endDate || !reason) {
      setError("Please fill all fields.");
      return;
    }

    const leaveData = {
      startDate,
      endDate,
      reason,
    };

    try {
      await createLeaveRequest(leaveData, auth.token);
      onLeaveAdded();
      closeModal();
    } catch (err) {
      setError(err.message || "Failed to submit leave request.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-gray-700">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-gray-700">Reason</label>
        <input
          type="text"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-md"
        />
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-300"
      >
        Submit Leave Request
      </button>
    </form>
  );
};

export default LeaveRequestForm;
