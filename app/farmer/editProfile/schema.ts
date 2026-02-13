import { z } from "zod";

export const editFarmerProfile = z.object({
  email: z.email("Invalid email address").optional(),
  fullName: z.string().trim().optional(),
  farmName: z.string().trim().optional(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters").optional(),
  farmLocation: z.string().optional(),
  phoneNumber: z.string().optional(),
  profile_image: z.any().optional(),
});

export type EditFarmerProfile = z.infer<typeof editFarmerProfile>
