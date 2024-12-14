import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const handleGoogleSignIn = () => {
    googleSignIn().then((res) => {
      toast.success("Login successful.", {
        position: "top-center",
      });
      setTimeout(() => {
        navigate("/");
      }, 1000);

      const userInfo = {
        name: res.user.displayName,
        email: res.user.email,
        profileImage: res.user.photoURL,
      };
      axiosPublic.post("/api/users", userInfo).then((res) => {
        if (res.data.success === true) {
          toast.success("Your registration is successful.", {
            position: "top-center",
          });
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      });
    });
  };
  return (
    <div className="w-full">
      <button
        onClick={handleGoogleSignIn}
        className="btn w-full text-xl text-white bg-orange-500"
      >
        <FaGoogle></FaGoogle>
        Google
      </button>
    </div>
  );
};
export default SocialLogin;
