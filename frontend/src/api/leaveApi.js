// src/api/leaveApi.js
import API_BASE_URL from "../config/api";

// Fungsi untuk mengajukan cuti
export const createLeaveRequest = async (leaveData, token) => {
  const response = await fetch(`${API_BASE_URL}/leaves`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`, // Token untuk autentikasi
    },
    body: JSON.stringify(leaveData),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to create leave request");
  }

  return await response.json();
};

// Fungsi untuk mengambil semua pengajuan cuti
export const getLeaveRequests = async (token) => {
  const response = await fetch(`${API_BASE_URL}/leaves`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`, // Token untuk autentikasi
    },
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to fetch leave requests");
  }

  return await response.json();
};
