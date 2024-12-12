import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
const useQuote = () => {
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const {
    data: quotes = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["quotes"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/quote");
      return res.data;
    },
  });

  const invalidateQuotes = () => {
    queryClient.invalidateQueries(["quotes"]);
  };

  return { quotes, isLoading, refetch, invalidateQuotes };
};
export default useQuote;
