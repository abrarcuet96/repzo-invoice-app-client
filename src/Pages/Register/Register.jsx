import { useContext } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { MdEmail, MdLock, MdPerson, MdPhotoCamera } from "react-icons/md"; // React icons
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Register = () => {
  const { registerUser, updateUserProfile, loading, setLoading } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const onSubmit = (data) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      profileImage: data.photo,
      role: data.role, // Capture the selected role
    };

    registerUser(data.email, data.password)
      .then(() => {
        updateUserProfile(data.name, data.photo).then(() => {
          axiosPublic.post("/api/users", userInfo).then((res) => {
            if (res.data.success) {
              toast.success("Registration successful!", { duration: 1000 });
              setTimeout(() => {
                navigate("/");
              }, 1000);
              reset();
            }
          });
        });
      })
      .catch((err) => {
        setLoading(false);
        toast.error(`Registration failed: ${err.message}`, { duration: 1000 });
      });
  };

  return (
    <div className="min-h-[800px] flex mt-2">
      {/* Left Section */}
      <div className="w-1/2 bg-gradient-to-r from-[#0E86D4] to-[#055c9d] text-white flex flex-col justify-center p-12 space-y-6">
        <h1 className="text-3xl font-semibold mb-4">
          Streamline Your <span className="text-yellow-300">Invoicing</span>
        </h1>
        <p className="text-lg mb-4">
          Our platform is designed to help businesses of all sizes manage their
          invoicing processes efficiently. Create, send, and track invoices with
          ease, ensuring smooth financial management for your business.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-lg">
          <li>Efficient invoice creation and tracking</li>
          <li>Secure and reliable platform</li>
          <li>Real-time reporting for informed decision-making</li>
        </ul>
        <p className="mt-4 text-md">
          Sign up today to start managing your invoices more effectively. Take
          control of your financial processes with ease.
        </p>
      </div>

      {/* Right Section - Form */}
      <div className="w-1/2 flex items-center justify-center p-12 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            Create Your Account
          </h2>
          <p className="text-center text-gray-600 mt-2">
            Sign up and get started today.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            {/* Name */}
            <div className="relative">
              <label className="block text-gray-700 font-medium">
                Full Name
              </label>
              <div className="flex items-center border-2 rounded-md border-gray-300 focus-within:ring-2 focus-within:ring-[#0E86D4]">
                <MdPerson className="text-gray-400 mx-3" />
                <input
                  type="text"
                  {...register("name", { required: "Full Name is required" })}
                  placeholder="Enter your name"
                  className="w-full py-2 px-4 rounded-md focus:outline-none"
                />
              </div>
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Photo */}
            <div className="relative">
              <label className="block text-gray-700 font-medium">
                Profile Photo URL
              </label>
              <div className="flex items-center border-2 rounded-md border-gray-300 focus-within:ring-2 focus-within:ring-[#0E86D4]">
                <MdPhotoCamera className="text-gray-400 mx-3" />
                <input
                  type="text"
                  {...register("photo", { required: "Photo URL is required" })}
                  placeholder="Enter photo URL"
                  className="w-full py-2 px-4 rounded-md focus:outline-none"
                />
              </div>
              {errors.photo && (
                <p className="text-sm text-red-500">{errors.photo.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="relative">
              <label className="block text-gray-700 font-medium">Email</label>
              <div className="flex items-center border-2 rounded-md border-gray-300 focus-within:ring-2 focus-within:ring-[#0E86D4]">
                <MdEmail className="text-gray-400 mx-3" />
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: emailRegex,
                      message: "Please enter a valid email",
                    },
                  })}
                  placeholder="Enter your email"
                  className="w-full py-2 px-4 rounded-md focus:outline-none"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-gray-700 font-medium">
                Password
              </label>
              <div className="flex items-center border-2 rounded-md border-gray-300 focus-within:ring-2 focus-within:ring-[#0E86D4]">
                <MdLock className="text-gray-400 mx-3" />
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value: passwordRegex,
                      message:
                        "Password must be at least 8 characters and contain one number and one letter",
                    },
                  })}
                  placeholder="Enter your password"
                  className="w-full py-2 px-4 rounded-md focus:outline-none"
                />
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Role Selection */}
            <div className="relative">
              <label className="block text-gray-700 font-medium">
                Select how you want to use RepZo?
              </label>
              <div className="flex items-center border-2 rounded-md border-gray-300 focus-within:ring-2 focus-within:ring-[#0E86D4]">
                <select
                  {...register("role", { required: "Role is required" })}
                  className="w-full py-2 px-4 rounded-md focus:outline-none"
                >
                  <option value="user">User</option>
                  <option value="customer">Customer</option>
                </select>
              </div>
              {errors.role && (
                <p className="text-sm text-red-500">{errors.role.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="py-2 px-5 w-full bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 disabled:bg-gray-300"
            >
              {loading ? "Please wait..." : "Register"}
              <Toaster />
            </button>
          </form>

          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#0E86D4] font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
