import { Data,  } from "@/pages/api/posts";
import axios, { AxiosError } from "axios";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const { data } = await axios.get<Data>(url);
  return data;
};

export const useGetPost = (url: string | null) => {
  const { data, isLoading, error } = useSWR<
    Data,
    AxiosError<Error>
  >(url, fetcher, {
    revalidateIfStale: true,
    onErrorRetry: (error) => {
      if (error.status === 401) return;
      if (error.status === 403) return;
    },
  });

  return {
    posts: data?.posts,
    error,
    isLoading,
  };
};
