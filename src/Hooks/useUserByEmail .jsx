import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useUserByEmail = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: userData = {},
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !!user?.email, // prevents request before email exists
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  return { userData, isLoading, refetch, error };
};

export default useUserByEmail;
