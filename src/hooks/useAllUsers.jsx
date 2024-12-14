import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
const useAllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], isPending: loading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`api/users`);
      return res.data;
    },
  });
  return [users, loading];
};
export default useAllUsers;
