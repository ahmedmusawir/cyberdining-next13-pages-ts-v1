import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "@/features/auth/apiAuth";
import {
  authenticationSuccess,
  authenticationFailure,
  startLoading,
} from "@/features/auth/authSlice";
import { ApiError, GlobalState } from "@/global-entities";
import { useRouter } from "next/router";
import Link from "next/link";

const LoginForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data: any) => {
    const { email, password } = data;
    dispatch(startLoading());

    try {
      const loginData = await login({ identifier: email, password }).unwrap();
      dispatch(authenticationSuccess(loginData.user));
      reset();
      // router.push("/profile");
    } catch (rawError) {
      const error = rawError as ApiError;
      console.error("Error during signup:", error);
      // Handle the error.
      const serverErrorMessage = error?.data?.error;
      const message = serverErrorMessage || "An unknown error occurred";

      // Update the Redux store with the error message.
      dispatch(authenticationFailure(message));

      // Update the local state with the error message.
      // setErrorMessage(message);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://res.cloudinary.com/dyb0qa58h/image/upload/v1693536280/100x100_qot8lz.png"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Signup For A New Account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                className="block w-full pl-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message as string}</p>
              )}
            </div>
          </div>

          {/* Password Input */}
          <div>
            {/* ... label and forgot password link ... */}
            <div className="mt-2">
              <input
                {...register("password", {
                  required: "Password is required",
                })}
                type="password"
                className="block w-full pl-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.password && (
                <p className="text-red-500">
                  {errors.password.message as string}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        {/* Signup link */}
        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link href="/signup">
            <span className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Signup for a 14 day free trial
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
