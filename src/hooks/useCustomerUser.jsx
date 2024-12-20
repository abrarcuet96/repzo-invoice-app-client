import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useCustomerUser = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  console.log(user?.email);
  const { data: customerUserData = {}, isPending: loading } = useQuery({
    queryKey: ["customerUserData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`api/customerUser/${user?.email}`);
      return res.data;
    },
  });
  return [customerUserData, loading];
};
export default useCustomerUser;
