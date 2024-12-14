import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
const useInvoice = () => {
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const {
    data: invoices = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["invoices"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/invoice");
      return res.data;
    },
  });

  const invalidateInvoices = () => {
    queryClient.invalidateQueries(["invoices"]);
  };

  return { invoices, isLoading, refetch, invalidateInvoices };
};
export default useInvoice;
