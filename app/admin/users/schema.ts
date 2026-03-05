import z, { email } from "zod";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const userSchema = z.object({
  fullName: z.string(),
  email: z.email({ message: "Enter valid email" }),
  password: z.string().min(6, { message: "min 6 characters" }),
  confirmPassword: z.string().min(6, { message: "min 6 characters" }),
  role: z.string(),
  profile_image: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only .jpg, .jpeg, .png and .webp formats are supported",
    }),
});

export type UserSchema = z.infer<typeof userSchema>
