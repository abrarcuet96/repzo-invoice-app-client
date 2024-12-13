import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useExpense = () => {
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  const {
    data: expenses = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/expense");
      return res.data;
    },
  });

  const invalidateExpenses = () => {
    queryClient.invalidateQueries(["expenses"]);
  };

  return { expenses, isLoading, refetch, invalidateExpenses };
};

export default useExpense;
