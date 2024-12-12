import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
const useUser = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  console.log(user?.email);
  const { data: userData = {}, isPending: loading } = useQuery({
    queryKey: ["userData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`api/users/${user?.email}`);
      return res.data;
    },
  });
  return [userData, loading];
};
export default useUser;
