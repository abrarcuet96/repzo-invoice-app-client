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
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{
        backgroundImage:
          "url('https://i.postimg.cc/9M4znM1P/pexels-andreea-ch-371539-1166644.jpg')",
      }}
    >
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Form Container */}
      <div className="relative w-full max-w-md bg-white p-8 shadow-xl z-10 space-y-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Create Your Account
        </h2>
        <p className="text-center text-gray-600 mt-2">
          Sign up and get started today.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
          {/* Name */}
          <div className="relative">
            <label htmlFor="name" className="block text-gray-700 font-medium">
              Full Name
            </label>
            <div className="flex items-center border-2 rounded-md border-gray-300 focus-within:ring-2 focus-within:ring-[#0E86D4]">
              <MdPerson className="text-gray-400 mx-3" />
              <input
                id="name"
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
            <label htmlFor="photo" className="block text-gray-700 font-medium">
              Profile Photo URL
            </label>
            <div className="flex items-center border-2 rounded-md border-gray-300 focus-within:ring-2 focus-within:ring-[#0E86D4]">
              <MdPhotoCamera className="text-gray-400 mx-3" />
              <input
                id="photo"
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
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <div className="flex items-center border-2 rounded-md border-gray-300 focus-within:ring-2 focus-within:ring-[#0E86D4]">
              <MdEmail className="text-gray-400 mx-3" />
              <input
                id="email"
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
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium"
            >
              Password
            </label>
            <div className="flex items-center border-2 rounded-md border-gray-300 focus-within:ring-2 focus-within:ring-[#0E86D4]">
              <MdLock className="text-gray-400 mx-3" />
              <input
                id="password"
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
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Role Selection */}
          <div className="relative">
            <label htmlFor="role" className="block text-gray-700 font-medium">
              Select how you want to use RepZo?
            </label>
            <div className="flex items-center border-2 rounded-md border-gray-300 focus-within:ring-2 focus-within:ring-[#0E86D4]">
              <select
                id="role"
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
            className="py-2 px-5 w-full bg-blue-500 text-white rounded-md shadow-lg hover:bg-blue-600 disabled:bg-gray-300"
          >
            {loading ? "Please wait..." : "Register"}
            <Toaster />
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#0E86D4] font-medium hover:underline"
          >
            Login
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

export default Register;
