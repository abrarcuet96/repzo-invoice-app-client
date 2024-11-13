import { useContext } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
const Login = () => {
  const { loginUser } = useContext(AuthContext);
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
    loginUser(data.email, data.password).then((res) => {
      navigate(from, { replace: true });
      toast.success("Login successful.", {
        position: "top-center",
      });
    });
    reset();
  };
  return (
    <div className="hero min-h-[800px] flex flex-col">
      <div className="flex bg-[#055c9d] w-full min-h-[200px] justify-center items-center">
        <h1 className="text-4xl font-semibold text-white">
          Login to your account
        </h1>
      </div>
      <div className="flex flex-row justify-center items-center h-[700px] w-full">
        <div className=" w-1/2 h-full bg-opacity-30 flex flex-col justify-center items-center p-10">
          <h1 className="text-5xl font-semibold text-center">
            Effortless Invoicing,{" "}
            <span className="text-[#0e86d4] font-bold">Anytime, Anywhere.</span>
          </h1>
          <p className="my-8 text-center">
            Streamline your invoicing process with ease! Generate, send, and
            manage invoices in seconds. Let us handle the details so you can
            focus on growing your business.
          </p>
        </div>
        <div className="card w-1/2 flex justify-center items-center">
          <form className="card-body w-3/4" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="email"
                className="input input-bordered rounded-md"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password", { required: true })}
                {...(errors.password && <span>This field is required</span>)}
                placeholder="password"
                className="input input-bordered rounded-md"
                required
              />
            </div>

            <div className="form-control mt-6">
              <input
                className="btn bg-[#003060] text-white text-xl rounded-md"
                type="submit"
                value="Login"
              />
              <Toaster />
            </div>
            <p className="text-center">
              Do not have an account? Please
              <Link className="font-bold" to="/signup">
                <span className="text-[#055c9d]"> Register</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
