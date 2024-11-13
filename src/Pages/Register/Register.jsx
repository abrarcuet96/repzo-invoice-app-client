import { useContext } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const Register = () => {
  const { registerUser } = useContext(AuthContext);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    registerUser(data.email, data.password).then((res) => {
      toast.success("Your registration is successful.", {
        position: "top-center",
      });
    });
    reset();
  };
  return (
    <div className="hero min-h-[800px] flex flex-col">
      <div className="flex bg-[#055c9d] w-full min-h-[200px] justify-center items-center">
        <h1 className="text-4xl font-semibold text-white">Create an account</h1>
      </div>
      <div className="flex flex-row justify-center items-center h-[700px] w-full">
        <div className=" w-1/2 h-full bg-opacity-30 flex flex-col justify-center items-center p-10">
          <h1 className="text-5xl font-semibold text-center">
            Your invoicing is about to get a{" "}
            <span className="text-[#0e86d4] font-bold">whole lot easier</span>
          </h1>
          <p className="my-8 text-center">
            Join our platform to simplify your invoicing. Quickly create, track,
            and organize invoices—all in one place. Sign up today and take
            control of your finances with ease!
          </p>
        </div>
        <div className="card w-1/2 flex justify-center items-center">
          <form className="card-body w-3/4" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="name"
                {...register("name", { required: true })}
                placeholder="name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo</span>
              </label>
              <input
                type="photo"
                {...register("photo", { required: true })}
                placeholder="photo"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="email"
                className="input input-bordered"
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
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control mt-6">
              <input
                className="btn bg-[#003060] text-white text-xl rounded-md"
                type="submit"
                value="Register"
              />
              <Toaster />
            </div>
            <p className="text-center">
              Already have an account?{" "}
              <Link className="font-bold" to="/login">
                <span className="text-[#055c9d]">Login</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;
