const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getEmployees = async (token) => {
  const response = await fetch(`${API_BASE_URL}/employees`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to fetch employees");
  }

  return await response.json();
};