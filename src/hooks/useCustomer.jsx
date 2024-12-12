import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCustomer = () => {
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  const {
    data: customers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/customer");
      return res.data;
    },
  });

  const invalidateCustomers = () => {
    queryClient.invalidateQueries(["customers"]);
  };

  return { customers, isLoading, refetch, invalidateCustomers };
};

export default useCustomer;
