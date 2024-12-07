import API_BASE_URL from "../config/api";

export const registerUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/employees/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Registration failed");
  }

  return await response.json();
};


export const loginUser = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/employees/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Login failed");
  }

  return await response.json();
};