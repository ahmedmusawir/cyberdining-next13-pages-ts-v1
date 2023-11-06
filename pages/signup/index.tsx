import SignupContent from "@/components/page-view/authentication/SignupContent";
import withoutAuth from "@/features/auth/hoc/withoutAuth";
import styles from "./signup.module.scss";

const SignupPage = () => {
  return <SignupContent />;
};

export default withoutAuth(SignupPage);
