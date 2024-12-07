import { useState, useEffect } from "react";
import LeaveRequestForm from "../components/dashboard/LeaveRequestForm";
import LeaveRequests from "../components/dashboard/LeaveRequests";
import Modal from "../components/ui/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getLeaveRequests } from "../api/leaveApi";

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

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl font-semibold text-gray-800">Dashboard</h1>
        <h2>Hello, {JSON.parse(localStorage.getItem("user"))}</h2>
        <div className="flex justify-start">
          <button
            onClick={openModal}
            className="bg-blue-600 text-white py-3 px-6 rounded-md shadow-md hover:bg-blue-700 transition duration-300 w-full sm:w-auto"
          >
            Request Leave
          </button>
        </div>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <LeaveRequestForm closeModal={closeModal} onLeaveAdded={onLeaveAdded} />
        </Modal>

        {loading ? (
          <div className="flex justify-center items-center">
            <span className="text-gray-600">Loading...</span>
          </div>
        ) : (
          <LeaveRequests leaves={leaves} error={error} />
        )}

        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      </div>
    </div>
  );
};

export default DashboardPage;
