import { Page } from "@/components/globals";
import UpdatePassword from "@/components/ui-ux/authentication/UpdatePassword";
import UploadProfileImage from "@/components/ui-ux/authentication/UploadProfileImage";
import UserProfileHeader from "@/components/ui-ux/authentication/UserProfileHeader";
import Head from "next/head";

const ProfileContent = () => {
  return (
    <>
      <Head>
        <title>Next Starter Home</title>
        <meta name="description" content="This is the demo page" />
      </Head>
      <Page className={""} FULL={true}>
        <main className="profile-page">
          <section className="relative py-16 bg-blueGray-200">
            <div className="container mx-auto px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full shadow-xl rounded-lg border-2 border-gray-100">
                <div className="px-6">
                  <UserProfileHeader />
                  <UploadProfileImage />
                  <UpdatePassword />
                </div>
              </div>
            </div>
          </section>
        </main>
      </Page>
    </>
  );
};

export default ProfileContent;
