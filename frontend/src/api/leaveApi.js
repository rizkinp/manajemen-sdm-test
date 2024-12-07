import API_BASE_URL from "../config/api";
export const createLeaveRequest = async (leaveData, token) => {
  const response = await fetch(`${API_BASE_URL}/leaves`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(leaveData),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to create leave request");
  }

  return await response.json();
};

export const getLeaveRequests = async (token) => {
  const response = await fetch(`${API_BASE_URL}/leaves`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to fetch leave requests");
  }

  return await response.json();
};
