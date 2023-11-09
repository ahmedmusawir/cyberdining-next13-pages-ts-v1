// hooks/useUpdateUserProfileImage.ts
import { useDispatch } from "react-redux";
import { setUser } from "@/features/auth/authSlice";

const useUpdateUserProfileImage = () => {
  const dispatch = useDispatch();

  const updateUserProfileImage = async (userId: number, imageUrl: string) => {
    try {
      const response = await fetch(`/api/update-user-profile-img`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, imageUrl }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("User data after Strapi url update: Hook", data);
        // Update user in the global state with the new image URL
        dispatch(setUser(data));
      } else {
        throw new Error(data.message || "Error updating user profile image");
      }
    } catch (error) {
      console.error("Error updating user profile image:", error);
    }
  };

  return updateUserProfileImage;
};

export default useUpdateUserProfileImage;
