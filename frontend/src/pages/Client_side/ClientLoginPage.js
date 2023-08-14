import React, { useState } from "react";
import { useAuthContext } from "../AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin } = useAuthContext(); // Access the handleLogin function from AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await handleLogin(email, password);
      // The handleLogin function will handle the login logic, update the authentication state,
      // and redirect the user to the appropriate page based on their role.
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 ">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue">
          AppointmentHub
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 rounded font-semibold text-white bg-indigo-500  hover:blue-600 "
          >
            Login
          </button>
        </form>
        <p className="mt-2 text-center text-gray-600">
          Not registered yet?{" "}
          <a href="/register" className="text-pink-600 font-semibold">
            Register here
          </a>
        </p>
        <p className="mt-2 text-center text-gray-600">
           Registering as Professional?{" "}
          <a href="/professional/register" className="text-pink-600 font-semibold">
            Register here
          </a>
        </p>

      </div>
    </div>
  );
};

export default LoginPage;
