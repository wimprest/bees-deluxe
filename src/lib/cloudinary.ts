import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
});

export const CLOUDINARY_FOLDER = "bees-deluxe";

export default cloudinary;
