import { setUser } from "@/features/auth/authSlice";
import { GlobalState } from "@/global-entities";
import { useSelector } from "react-redux";

import { CldUploadWidget, CldUploadWidgetResults } from "next-cloudinary";

interface UploadInfo {
  secure_url?: string;
}

const ProfileImageCloudinaryForm = () => {
  const user = useSelector((state: GlobalState) => state.auth.user);

  // Function to be called after the image is uploaded successfully
  const handleSuccess = (result: CldUploadWidgetResults) => {
    const info = result.info as UploadInfo;
    // info will contain the details of the uploaded file
    console.log("Result", result.event);
    console.log("Upload Success", result.event);
    console.log("Secure URL", info?.secure_url);
    // Example: dispatch an action to save the URL to the user profile
  };

  return (
    <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
      <div className="flex flex-wrap justify-center">
        <div className="w-full lg:w-9/12 px-4">
          <h4 className="mb-5">Upload Profile Image:</h4>
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
              <button className="btn" onClick={() => open()}>
                Upload
              </button>
            )}
          </CldUploadWidget>
        </div>
      </div>
    </div>
  );
};

export default ProfileImageCloudinaryForm;
