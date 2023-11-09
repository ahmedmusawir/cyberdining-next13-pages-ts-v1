import { useSignupMutation } from "@/features/auth/apiAuth";
import { closeLoginModal, openLoginModal } from "@/features/auth/authSlice";
import { ApiError } from "@/global-entities";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const SignupForm = () => {
  const [signup, { isLoading, isError, data, error }] = useSignupMutation();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const { username, email, password } = data;
    // console.log("Signup Form Data:", data);

    try {
      const result = await signup({ username, email, password }).unwrap();

      // console.log("Signup successful:", result);
      reset();
      setErrorMessage(null); // Clear any previous error messages
      toast.success("Signup successful! Please login.");
      dispatch(openLoginModal());
    } catch (rawError) {
      const error = rawError as ApiError;
      console.error("Error during signup:", error);

      // Check if the error has a specific message from the server
      const serverErrorMessage = error?.data?.error;
      const message = serverErrorMessage || "An unknown error occurred";

      setErrorMessage(message);
      toast.error("Error during signup. Please try again.");
    }
  };

  useEffect(() => {
    dispatch(closeLoginModal());
  }, []);

  return (
    <>
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
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* User ID Input */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                User ID
              </label>
              <div className="mt-2">
                <input
                  {...register("username", { required: "User ID is required" })}
                  placeholder="User ID"
                  className="block w-full pl-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-2"
                />
                {errors.username && (
                  <p className="text-red-500">
                    {errors.username.message as string}
                  </p>
                )}
              </div>
            </div>

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
                  placeholder="Email"
                  className="block w-full pl-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-2"
                />
                {errors.email && (
                  <p className="text-red-500">
                    {errors.email.message as string}
                  </p>
                )}
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password should be at least 8 characters",
                    },
                  })}
                  placeholder="Password"
                  className="block w-full pl-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-2"
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
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-5"
              >
                Sign up
              </button>
              {errorMessage && (
                <p className="text-red-500 mt-2">{errorMessage}</p>
              )}
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              onClick={() => dispatch(openLoginModal())}
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
