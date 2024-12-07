import { useState } from "react";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", position: "", password: "" });
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const validate = (name, value) => {
    let errorMsg = "";
    switch (name) {
      case "email":
        { const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!value) errorMsg = "Email is required.";
        else if (!emailRegex.test(value)) errorMsg = "Please enter a valid email.";
        break; }
      case "password":
        if (!value) errorMsg = "Password is required.";
        else if (value.length < 6) errorMsg = "Password must be at least 6 characters.";
        else if (!/[A-Z]/.test(value)) errorMsg = "Password must contain at least one uppercase letter.";
        else if (!/[a-z]/.test(value)) errorMsg = "Password must contain at least one lowercase letter.";
        else if (!/[0-9]/.test(value)) errorMsg = "Password must contain at least one number.";
        else if (!/[^A-Za-z0-9]/.test(value)) errorMsg = "Password must contain at least one special character.";
        break;
      case "name":
        if (!value) errorMsg = "Name is required.";
        break;
      case "position":
        if (!value) errorMsg = "Position is required.";
        break;
      default:
        break;
    }
    return errorMsg;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const errorMsg = validate(name, value);
    setError((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});

    const validationErrors = Object.keys(formData).reduce((acc, field) => {
      const errorMsg = validate(field, formData[field]);
      if (errorMsg) acc[field] = errorMsg;
      return acc;
    }, {});

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    try {
      await registerUser(formData);
      toast.success("Registration successful! Redirecting to login page...");
      setTimeout(() => navigate("/login"), 3000); // Redirect setelah 3 detik
    } catch (err) {
      if (err.message === "Email already exists") {
        toast.error("Email already exists. Please use a different email.");
        setError({ email: "The email is already registered. Please use a different email." });
      } else {
        toast.error("Failed to register. Please try again.");
        setError({ general: err.message });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-blue-600 flex items-center justify-center py-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-gray-800">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Name"
            name="name"
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            error={error.name}
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            error={error.email}
          />
          <InputField
            label="Position"
            name="position"
            type="text"
            placeholder="Enter your position"
            value={formData.position}
            onChange={handleChange}
            error={error.position}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            error={error.password}
          />
          {error.general && <p className="text-red-500 text-sm text-center">{error.general}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Register
          </button>
        </form>
        <div className="text-center">
          <span className="text-gray-600">Already have an account?</span>
          <a href="/login" className="text-blue-600 hover:underline ml-1">
            Login
          </a>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2500} hideProgressBar={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default RegisterPage;
