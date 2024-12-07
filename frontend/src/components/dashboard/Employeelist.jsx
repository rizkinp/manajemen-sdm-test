import { useEffect, useState } from "react";
import { getEmployees } from "../../api/employeeApi";
import useAuth from "../../hooks/useAuth";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");
  const { auth } = useAuth();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const result = await getEmployees(auth.token);
        setEmployees(result.data);
      } catch (err) {
        setError(err.message || "Failed to fetch employees.");
      }
    };

    fetchEmployees();
  }, [auth.token]);

  return (
    <div className="space-y-4">
      {error && <p className="text-red-500 text-center">{error}</p>}
      <h2 className="text-xl font-semibold text-gray-800 text-center">Employee List</h2>
      <ul className="space-y-2">
        {employees.map((employee) => (
          <li key={employee._id} className="border-b pb-4">
            <div className="flex flex-col bg-gray-100 p-4 rounded-lg shadow-sm">
              <p><strong>Name:</strong> {employee.name}</p>
              <p><strong>Email:</strong> {employee.email}</p>
              <p><strong>Position:</strong> {employee.position}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
