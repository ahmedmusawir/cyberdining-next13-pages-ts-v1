import React from "react";
import { useSelector } from "react-redux";
import { GlobalState } from "@/global-entities";
import { CldUploadWidget, CldUploadWidgetResults } from "next-cloudinary";
import useUpdateUserProfileImage from "@/hooks/useUpdateUserProfileImage";

interface UploadInfo {
  secure_url: string;
}

const ProfileImageCloudinaryForm = () => {
  const user = useSelector((state: GlobalState) => state.auth.user);
  const updateUserProfileImage = useUpdateUserProfileImage();

  // Function to be called after the image is uploaded successfully
  const handleSuccess = async (result: CldUploadWidgetResults) => {
    const info = result.info as UploadInfo;
    if (result.event === "success" && user) {
      console.log("Upload Success", result.event);
      console.log("Secure URL", info.secure_url);
      await updateUserProfileImage(user.id, info.secure_url);
    }
  };

  return (
    <div className="flex flex-wrap justify-center">
      <div className="w-full lg:w-9/12 px-4">
        {/* <h4 className="mb-5">Upload Profile Image:</h4> */}
        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          onUpload={(result) => handleSuccess(result)}
          options={{
            sources: ["local", "url"],
            maxFiles: 1,
            multiple: false,
            styles: {},
          }}
        >
          {({ open }) => (
            <button className="btn btn-sm mt-3" onClick={() => open()}>
              Upload Profile Image
            </button>
          )}
        </CldUploadWidget>
      </div>
    </div>
  );
};

export default ProfileImageCloudinaryForm;
