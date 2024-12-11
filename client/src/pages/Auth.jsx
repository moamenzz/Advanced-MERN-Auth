import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Mail, Loader } from "lucide-react";
import Input from "../components/Input.jsx";
import { useAuthStore } from "../../store/authStore.js";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";
import { axiosInstance } from "../../utils/axiosInstance.js";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLoading = false;
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  const { login, error } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/auth", {
        email,
        pwd: password,
      });
      console.log(response?.data);
      const accessToken = response.data.accessToken;
      const roles = response.data.roles;
      await setAuth({ email, pwd: password, roles, accessToken });
      // console.log(auth);
      console.log(accessToken);
      console.log(roles);
      navigate("/Dashboard");
    } catch (error) {
      console.error(e);
      throw new Error();
    }
    // try {
    //   await login(email, password, setAuth);
    //   navigate("/Dashboard");
    // } catch (error) {
    //   console.error(error);
    // }
  };
  useEffect(() => {
    console.log("Auth updated:", auth);
  }, [auth]);

  return (
    <motion.dev
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
			overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin}>
          <Input
            icon={Mail}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className=" text-red-500 font-semibold mt-2">{error}</p>}

          <Link
            className="text-green-400 hover:underline"
            to="/forgot-password"
          >
            Forgot Password?
          </Link>

          <motion.button
            className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
						font-bold rounded-lg shadow-lg hover:from-green-600
						hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
						 focus:ring-offset-gray-900 transition duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="w-6 h-6 animate-spin mx-auto" />
            ) : (
              "Log in"
            )}
          </motion.button>
        </form>
      </div>
      {/* If no account */}
      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
        <p className="text-sm text-gray-400">
          Need an Account?{" "}
          <Link className="text-green-400 hover:underline" to="/register">
            Register!
          </Link>
        </p>
      </div>
    </motion.dev>
  );
};
export default Auth;
