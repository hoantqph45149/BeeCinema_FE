import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiService } from "../apis/axios";
import { showAlert } from "../Components/Common/showAlert";

export const useFetch = (key, url, params) => {
  return useQuery({
    queryKey: key,
    queryFn: async () => await apiService.get(url, params),
  });
};

export const useCRUD = (key) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async ({ url, data }) => await apiService.post(url, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key });
      showAlert("Thành công!", "Thêm Thành công!");
    },
    onError: (error) => {
      showAlert(
        "Thất Bại",
        `${
          error?.response?.data?.message
            ? error?.response?.data?.message
            : "Thêm Thất Bại"
        }`,
        "error"
      );
    },
  });

  const putMutation = useMutation({
    mutationFn: async ({ url, data }) => await apiService.put(url, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key });
      showAlert("Thành công!", "Thay Đổi Thành công!");
    },
    onError: (error) => {
      showAlert(
        "Thất Bại",
        `${
          error?.response?.data?.message
            ? error?.response?.data?.message
            : "Thay Đổi Thất Bại"
        }`,
        "error"
      );
    },
  });

  const patchMutation = useMutation({
    mutationFn: async ({ url, data }) => await apiService.patch(url, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key });
      showAlert("Thành công!", "Thay Đổi Thành công!");
    },
    onError: (error) => {
      showAlert(
        "Thất Bại",
        `${
          error?.response?.data?.message
            ? error?.response?.data?.message
            : "Thay Đổi Thất Bại"
        }`,
        "error"
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (url) => await apiService.delete(url),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key });
      showAlert("Thành công!", "Xóa Thành công!");
    },
    onError: (error) => {
      showAlert(
        "Thất Bại",
        `${
          error?.response?.data?.message
            ? error?.response?.data?.message
            : "Xóa Thất Bại"
        }`,
        "error"
      );
    },
  });

  return {
    create: {
      mutate: createMutation.mutate,
      isLoading: createMutation.isPending,
      isError: createMutation.isError,
      isSuccess: createMutation.isSuccess,
      data: createMutation.data,
      error: createMutation.error,
    },
    put: {
      mutate: putMutation.mutate,
      isLoading: putMutation.isPending,
      isError: putMutation.isError,
      isSuccess: putMutation.isSuccess,
      data: putMutation.data,
      error: putMutation.error,
    },
    patch: {
      mutate: patchMutation.mutate,
      isLoading: patchMutation.isPending,
      isError: patchMutation.isError,
      isSuccess: patchMutation.isSuccess,
      data: patchMutation.data,
      error: patchMutation.error,
    },
    delete: {
      mutate: deleteMutation.mutate,
      isLoading: deleteMutation.isPending,
      isError: deleteMutation.isError,
      isSuccess: deleteMutation.isSuccess,
      data: deleteMutation.data,
      error: deleteMutation.error,
    },
  };
};
