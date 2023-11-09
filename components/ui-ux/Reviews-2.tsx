import { GlobalState } from "@/global-entities";
import { calculateReviewRatingAverage } from "@/utils";
import { useSelector } from "react-redux";
import ReviewForm from "../forms/ReviewForm";
import ReviewList from "../list-view/ReviewList";
import ReviewRatingWidget from "./restaurants/ReviewRatingWidget";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Reviews = () => {
  const isAuthenticated = useSelector(
    (state: GlobalState) => state.auth.isAuthenticated
  );
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-32">
        <div className="lg:col-span-4">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Customer Reviews
          </h2>

          <ReviewRatingWidget />

          <div className="mt-10">
            <h3 className="text-lg font-medium text-gray-900">
              Share your thoughts
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              If you’ve used this product, share your thoughts with other
              customers
            </p>

            {!isAuthenticated && (
              <button
                className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full"
                // onClick={() => dispatch(openLoginModal())}
              >
                Write a review
              </button>
            )}
          </div>
          {isAuthenticated && <ReviewForm postId={1} />}
        </div>
      </div>

      <div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
        <h3 className="sr-only">Recent reviews</h3>

        <div className="flow-root">
          <div className="-my-12 divide-y divide-gray-200">
            {/* {reviews?.length === 0 && (
                <div className="flex item-center p-10">
                  <h2 className="text-lg font-bold text-gray-900">
                    No comment found!
                  </h2>
                </div>
              )} */}

            <ReviewList />
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
    // </div>
  );
};

export default Reviews;
