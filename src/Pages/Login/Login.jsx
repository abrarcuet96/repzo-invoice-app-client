import { useContext } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { FaEnvelope, FaLock } from "react-icons/fa"; // Icons for email and password
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import { AuthContext } from "../../Providers/AuthProvider";

const Login = () => {
  const { loginUser, loading, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    loginUser(data.email, data.password)
      .then(() => {
        toast.success("Login successful.", { position: "top-center" });
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 1000);
        reset();
      })
      .catch((err) => {
        setLoading(false);
        toast.error(
          "Login unsuccessful. Please register if you don’t have an account.",
          { position: "top-center" }
        );
        navigate("/signup");
      });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{
        backgroundImage:
          "url('https://i.postimg.cc/wTDRz1z0/pawel-czerwinski-M40-Qn-K-PXk-I-unsplash.jpg')",
      }}
    >
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Form Container */}
      <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-white p-6 sm:p-8 shadow-lg space-y-6 z-10">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Log In
        </h2>
        <p className="text-center text-gray-500">
          Access your account and continue where you left off.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
          {/* Email */}
          <div className="relative">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium text-sm"
            >
              Email Address
            </label>
            <div className="flex items-center border border-gray-300 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-[#055c9d]">
              <FaEnvelope className="text-gray-400 mx-3" />
              <input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border-0 focus:ring-0 rounded-md focus:outline-none"
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium text-sm"
            >
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-[#055c9d]">
              <FaLock className="text-gray-400 mx-3" />
              <input
                id="password"
                type="password"
                {...register("password", { required: "Password is required" })}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border-0 focus:ring-0 rounded-md focus:outline-none"
              />
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="py-2 px-5 bg-blue-500 text-white rounded-md shadow w-full hover:bg-blue-600 disabled:bg-gray-300"
          >
            {loading ? "Please wait..." : "Log In"}
            <Toaster />
          </button>
        </form>

        {/* Social Login */}
        <div className="text-center my-4">
          <p className="text-gray-600">Or log in with Google</p>
          <SocialLogin />
        </div>

        {/* Register Link */}
        <p className="text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-[#055c9d] font-medium hover:underline"
          >
            Register
          </Link>
        </p>

        {/* Back to Home Link */}
        <div className="mx-auto border-2 w-[200px] mt-4 p-1 rounded-lg">
          <p className="text-center text-gray-600">
            Back to{" "}
            <Link to="/" className="text-[#055c9d] font-medium hover:underline">
              Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
