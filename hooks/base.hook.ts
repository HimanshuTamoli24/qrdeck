import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { baseService } from "@/services/base.service";

// Image upload auth hook
export const useImagekitAuthCheck = () => {
    return useQuery({
        queryKey: ["imagekitAuthCheck"],
        queryFn: () => baseService.imagekitAuthCheck(),
    });
}

// Get all QR codes
export const useGetAllQr = () => {
    return useQuery({
        queryKey: ["getAllQr"],
        queryFn: () => baseService.getAllQr(),
    });
};

// Get single QR
export const useGetQr = (id: string) => {
    return useQuery({
        queryKey: ["getQr", id],
        queryFn: () => baseService.getQr(id),
        enabled: !!id,
    });
};

// Create QR
export const useCreateQr = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: any) => baseService.createQr(payload),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["getAllQr"] }),
    });
};

// Update QR
export const useUpdateQr = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updateData: any) => baseService.updateQr(id, updateData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getQr", id] });
            queryClient.invalidateQueries({ queryKey: ["getAllQr"] });
        },
    });
}

// Delete QR
export const useDeleteQr = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => baseService.deleteQr(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["getAllQr"] }),
    });
};

