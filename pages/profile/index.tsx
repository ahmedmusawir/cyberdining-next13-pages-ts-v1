import ProfileContent from "@/components/page-view/authentication/ProfileContent";
import withAuth from "@/features/auth/hoc/withAuth";
import styles from "./profile.module.scss";

const ProfilePage = () => {
  return <ProfileContent />;
};

export default withAuth(ProfilePage);
