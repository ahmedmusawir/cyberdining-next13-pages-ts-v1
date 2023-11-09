import { NextApiRequest, NextApiResponse } from "next";
import strapiApiClient from "@/services/strapiApiClient";
import { AxiosError } from "@/global-entities";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PUT") {
    return res.status(405).end();
  }

  const { userId, imageUrl } = req.body;

  try {
    // Update user's profile image
    const updateResponse = await strapiApiClient.put(
      `/users/${userId}`,
      {
        profileImage: imageUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${req.cookies.jwt}`,
        },
      }
    );

    // console.log(
    //   "Update Response - /pages/api/update-user-profile-img",
    //   updateResponse.status
    // );

    // Check if the image update was successful
    if (updateResponse.status === 200) {
      // Fetch the full user object with the profile image and related fields
      const userResponse = await strapiApiClient.get("/users/me?populate=*", {
        headers: {
          Authorization: `Bearer ${req.cookies.jwt}`,
        },
      });

      // If the user data is fetched successfully, return it
      if (userResponse.status === 200) {
        return res.status(200).json(userResponse.data);
      } else {
        throw new Error(userResponse.statusText);
      }
    } else {
      throw new Error(updateResponse.statusText);
    }
  } catch (err) {
    const error = err as AxiosError;
    console.error("Error updating user:", error);
    return res.status(error.response?.status || 500).json(error.response?.data);
  }
};
