import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: true,
            staleTime: 60000, // 1 phút
            cacheTime: 600000, // 10 phút
            retry: 1,
        },
    },
});

export const invalidateQueries = (queryKey) => {
    return queryClient.invalidateQueries(queryKey);
};