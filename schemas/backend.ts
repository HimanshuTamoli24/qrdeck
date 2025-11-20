import { z } from "zod";

export const QRCreateSchema = z.object({
    originalImageUrl: z
        .string()
        .min(1, "Original image URL is required")
        .url("Invalid URL"),

    textData: z.string().optional(),

    owner: z.string().min(1, "Owner ID is required"),
});


export const QRUpdateSchema = z.object({
    textData: z.string().optional(),
    uniqueLink: z.string().optional(),
    originalImageUrl: z.string().optional(),
});