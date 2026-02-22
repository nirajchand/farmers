import z from "zod";

export const editConsumerProfile = z.object({
  email: z.email("Invalid email address").optional(),
  fullName: z.string().trim().optional(),
  phoneNumber: z.string().min(10,"Min 10 digit").optional(),
  userLocation: z.string().trim().optional(),
  profile_image: z.any().optional(),
  createdAt: z.any().optional(),
});

export type EditConsumerProfile = z.infer<typeof editConsumerProfile>;
