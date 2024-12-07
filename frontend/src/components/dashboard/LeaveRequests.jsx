import { useEffect, useState } from "react";
import { getLeaveRequests } from "../../api/leaveApi";
import useAuth from "../../hooks/useAuth";

const LeaveRequests = () => {
  const { auth } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const result = await getLeaveRequests(auth.token);
        setLeaves(result.data);
      } catch (err) {
        setError(err.message || "Failed to fetch leave requests.");
      }
    };
    fetchLeaves();
  }, [auth.token]);

  return (
    <div className="space-y-4">
      {error && <p className="text-red-500 text-center">{error}</p>}
      <h2 className="text-xl font-semibold text-gray-800 text-center">Your Leave Requests</h2>
      <ul className="space-y-2">
        {leaves.map((leave) => (
          <li key={leave._id} className="border-b pb-4">
            <div className="flex flex-col bg-blue-100 p-4 rounded-lg shadow-sm">
              <p><strong>Reason:</strong> {leave.reason}</p>
              <p><strong>Start Date:</strong> {new Date(leave.startDate).toLocaleDateString()}</p>
              <p><strong>End Date:</strong> {new Date(leave.endDate).toLocaleDateString()}</p>
              <p><strong>Status:</strong> <span className={`text-${leave.status === "approved" ? "green" : "red"}-500`}>{leave.status}</span></p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaveRequests;
