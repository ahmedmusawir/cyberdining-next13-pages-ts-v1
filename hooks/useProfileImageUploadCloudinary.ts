import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setUser } from "@/features/auth/authSlice";
import { User } from "@/global-entities";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

interface Props {
  user: User | null;
  setUser: ActionCreatorWithPayload<any, "auth/setUser">;
}

const useProfileImageUpload = ({ user }: Props) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const onImageSubmit = handleSubmit(async (data) => {
    const file = data.profileImage[0];
    if (!file) {
      console.error("No file selected");
      return;
    }

    try {
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append("file", file);

      // Make a POST request to your Next.js API route
      const uploadResponse = await fetch("/api/upload-to-cloudinary", {
        method: "POST",
        body: formData,
      });

      const uploadResult = await uploadResponse.json();

      if (uploadResponse.ok) {
        // Update the user's profile with the new image URL
        const imageUrl = uploadResult.url;
        if (user && imageUrl) {
          // Make a PUT request to update the user's image in your backend
          const updateResponse = await fetch(`/api/update-user-profile-img`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: user.id, imageUrl: imageUrl }),
          });

          const updateResult = await updateResponse.json();

          if (updateResponse.ok) {
            // Update user in your global state with the new image URL
            dispatch(setUser(updateResult));
          } else {
            throw new Error(
              updateResult.error || "Error updating user profile image"
            );
          }
        }
      } else {
        throw new Error(uploadResult.error || "Error uploading image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  });

  return {
    register,
    onImageSubmit,
  };
};

export default useProfileImageUpload;
