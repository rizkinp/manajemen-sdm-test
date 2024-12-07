import { useState } from "react";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import InputField from "../components/InputField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState({});
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    try {
      const result = await loginUser(credentials);
      const token = result.data.token;
      const user = result.data.name;

      setAuth({ user, token });
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login successful! Redirecting to dashboard...");
      setTimeout(() => navigate("/dashboard"), 3000); // Redirect setelah 3 detik
    } catch (err) {
      if (err.message === "Invalid credentials") {
        toast.error("Invalid email or password.");
        setError({ password: "Invalid email or password" });
      } else {
        toast.error("An error occurred. Please try again.");
        setError({ general: err.message });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-blue-600 flex items-center justify-center py-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-gray-800">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={credentials.email}
            onChange={handleChange}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={credentials.password}
            onChange={handleChange}
          />
          {error.password && <p className="text-red-500 text-sm text-center">{error.password}</p>}
          {error.general && <p className="text-red-500 text-sm text-center">{error.general}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>
        <div className="text-center">
          <span className="text-gray-600">Don&apos;t have an account?</span>
          <a href="/register" className="text-blue-600 hover:underline ml-1">
            Register
          </a>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2500} hideProgressBar={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default LoginPage;