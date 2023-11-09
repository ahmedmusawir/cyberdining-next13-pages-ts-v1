import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useCreateReviewMutation } from "@/features/reviews/apiReviews";
import { useState } from "react";
import { toast } from "react-toastify";
import { ApiError, GlobalState } from "@/global-entities";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const ReviewForm = ({ postId }: { postId: number | undefined }) => {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;
  const user = useSelector((state: GlobalState) => state.auth.user);
  const profileImage = user?.profileImage;
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  console.log("UserID in comment form:", user?.id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const [createComment] = useCreateReviewMutation();

  const onSubmit = async (data: any) => {
    reset();
    try {
      await createComment({
        content: data.comment,
        postId: postId,
        userId: user?.id,
      });
      console.log("Commenting successful:");
      setErrorMessage(null); // Clear any previous error messages
      toast.success("Commenting successful! Please login.");
    } catch (rawError) {
      const error = rawError as ApiError;
      console.error("Error during Commenting:", error);

      // Check if the error has a specific message from the server
      const serverErrorMessage = error?.data?.error;
      const message = serverErrorMessage || "An unknown error occurred";

      setErrorMessage(message);
      toast.error("Error during Commenting. Please try again.");
    }
  };

  return (
    <div className="flex items-start space-x-4 mt-5">
      <div className="flex-shrink-0">
        <img
          className="inline-block h-10 w-10 rounded-full"
          src={`${baseUrl}${profileImage}`}
          alt=""
        />
      </div>
      <div className="min-w-0 flex-1">
        <form onSubmit={handleSubmit(onSubmit)} className="relative">
          <div className="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
            <label htmlFor="comment" className="sr-only">
              Add your comment
            </label>
            <textarea
              rows={6}
              {...register("comment", { required: "Comment is required" })}
              className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 pl-5 pt-3"
              placeholder="Add your comment..."
            />
          </div>

          {errors.comment?.message && (
            <span className="text-red-500 text-sm mt-1">
              {errors.comment.message as string}
            </span>
          )}

          <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
            <div className="flex-shrink-0">
              <button
                type="submit"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
