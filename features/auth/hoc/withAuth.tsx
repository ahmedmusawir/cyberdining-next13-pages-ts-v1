import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { GlobalState } from "@/global-entities";

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    const Router = useRouter();
    const isAuthenticated = useSelector(
      (state: GlobalState) => state.auth.isAuthenticated
    );

    // If user is not authenticated, redirect to home
    if (!isAuthenticated) {
      Router.push("/");
      return null;
    }

    // If user is authenticated, render the wrapped component
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
