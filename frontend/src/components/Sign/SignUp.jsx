import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles.js";
import { Link } from "react-router-dom";
import axios from "axios";
import { validateUserInputs } from "../../utils/validateUserInputs.js";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [errors, setErrors] = useState({});

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { name, email, password, confirmPassword };

    // Validate user inputs
    if (!validateUserInputs(formData, setErrors)) {
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match",
      }));
      return;
    }

    try {
      const response = await axios.post(`${backendUrl}/register`, formData);

      // Handle successful registration
      if (response.data.status === "ok") {
        alert(`${response.data.message}! Please Login to Continue.`);
        window.location.href = "/login"; // Redirect to login page
      } else {
        alert(response.data.message || "An unexpected error occurred");
      }
    } catch (error) {
      alert(
        "An error occurred while processing your request. Please try again later."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register as a New User
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Full Name input */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-grey-700"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-grey-300 rounded-md shadow-sm placeholder-grey-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>
            </div>
            {/* Email input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-grey-700"
              >
                Email Address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-grey-300 rounded-md shadow-sm placeholder-grey-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
            </div>
            {/* Password input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-grey-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-grey-300 rounded-md shadow-sm placeholder-grey-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
                {visible ? (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 text-gray-400 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEye
                    className="absolute right-2 top-2 text-gray-400 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>
            {/* Confirm Password input */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-grey-700"
              >
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={confirmVisible ? "text" : "password"}
                  name="confirmPassword"
                  autoComplete="current-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-grey-300 rounded-md shadow-sm placeholder-grey-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </p>
                )}
                {confirmVisible ? (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 text-gray-400 cursor-pointer"
                    size={25}
                    onClick={() => setConfirmVisible(false)}
                  />
                ) : (
                  <AiOutlineEye
                    className="absolute right-2 top-2 text-gray-400 cursor-pointer"
                    size={25}
                    onClick={() => setConfirmVisible(true)}
                  />
                )}
              </div>
            </div>
            {/* Submit button */}
            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
            {/* Link to log in if the user already has an account */}
            <div className={`${styles.normalFlex} w-full`}>
              <h4>Already have an account?</h4>
              <Link to="/login" className="text-blue-600 pl-2">
                Log In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
