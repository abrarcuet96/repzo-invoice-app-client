import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
const useItem = () => {
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const {
    data: items = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/item");
      return res.data;
    },
  });

  const invalidateCustomers = () => {
    queryClient.invalidateQueries(["items"]);
  };

  return { items, isLoading, refetch, invalidateCustomers };
};
export default useItem;
