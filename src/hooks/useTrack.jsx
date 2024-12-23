import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useUser from "./useUser";

const useTrack = () => {
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const [userData] = useUser();

  // Check if the user ID is available
  const userId = userData?.data?._id;

  const {
    data: tracks = [],
    isLoading: queryLoading,
    refetch,
  } = useQuery({
    queryKey: ["tracks"],
    queryFn: async () => {
      if (!userId) return [];
      const res = await axiosPublic.get(`/api/track/${userId}`);
      return res.data;
    },
    enabled: !!userId, // Only run the query when the userId is available
  });

  const isLoading = queryLoading || !userId; // Consider loading until the userId is present

  const invalidateTracks = () => {
    queryClient.invalidateQueries(["tracks"]);
  };

  return { tracks, isLoading, refetch, invalidateTracks };
};

export default useTrack;
