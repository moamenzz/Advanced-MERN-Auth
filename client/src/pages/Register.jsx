import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Loader, Lock, Mail, User } from "lucide-react";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter.jsx";
import Input from "../components/Input";
import { useAuthStore } from "../../store/authStore.js";

const Register = () => {
  const [email, setEmail] = useState("");
  const [user, setUsername] = useState("");
  const [pwd, setPassword] = useState("");

  const { signup, error, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await signup(email, user, pwd);
      navigate("/verify");
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
			overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Create Account
        </h2>

        <form onSubmit={handleRegister}>
          <Input
            icon={Mail}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icon={User}
            type="text"
            placeholder="Username"
            value={user}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={pwd}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
          <PasswordStrengthMeter password={pwd} />

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
              <Loader className="animate-spin mx-auto size={24}" />
            ) : (
              "Sign up"
            )}
          </motion.button>
        </form>
      </div>
      {/* Already have an account? */}
      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
        <p className="text-sm text-gray-400">
          Already have an account?{" "}
          <Link className="text-green-400 hover:underline" to={"/auth"}>
            Log In
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Register;
