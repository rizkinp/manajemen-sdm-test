import { useState, useEffect } from "react";
import LeaveRequestForm from "../components/dashboard/LeaveRequestForm";
import LeaveRequests from "../components/dashboard/LeaveRequests";
import Modal from "../components/ui/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getLeaveRequests } from "../api/leaveApi";
import EmployeeList from "../components/dashboard/Employeelist"; 

const DashboardPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const fetchLeaves = async () => {
    setLoading(true);
    try {
      const result = await getLeaveRequests();
      setLeaves(result.data);
    } catch (err) {
      setError(err.message || "Failed to fetch leave requests.");
    } finally {
      setLoading(false);
    }
  };

  const onLeaveAdded = async () => {
    await fetchLeaves();
    closeModal();
    toast.success("Leave request created successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    window.location.href = "/login";
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <div className="w-full flex flex-col bg-gray-100 px-6 py-4">
      <div className="space-y-2">
        <h1 className="text-4xl font-semibold text-gray-900">Dashboard</h1>
        <h2 className="text-xl text-gray-700">Hello, {JSON.parse(localStorage.getItem("user"))}</h2>

        <div className="flex justify-start">
          <button
            onClick={openModal}
            className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
          >
            Request Leave
          </button>
        </div>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <LeaveRequestForm closeModal={closeModal} onLeaveAdded={onLeaveAdded} />
        </Modal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Leave Requests Section */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg">
            {loading ? (
              <div className="flex justify-center items-center">
                <span className="text-gray-600">Loading...</span>
              </div>
            ) : (
              <LeaveRequests leaves={leaves} error={error} />
            )}
          </div>

          {/* Employee List Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <EmployeeList />
          </div>
        </div>

        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="fixed bottom-6 right-6 bg-red-600 text-white py-2 px-4 rounded-full shadow-lg hover:bg-red-700 transition duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default DashboardPage;
