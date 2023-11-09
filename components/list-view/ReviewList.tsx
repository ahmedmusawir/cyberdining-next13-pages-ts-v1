import { StarIcon } from "@heroicons/react/24/outline";
import React from "react";

const reviews = {
  average: 4,
  totalCount: 1624,
  counts: [
    { rating: 5, count: 1019 },
    { rating: 4, count: 162 },
    { rating: 3, count: 97 },
    { rating: 2, count: 199 },
    { rating: 1, count: 147 },
  ],
  featured: [
    {
      id: 1,
      rating: 5,
      content: `
          <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
        `,
      author: "Emily Selman",
      avatarSrc:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    {
      id: 2,
      rating: 5,
      content: `
            <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
          `,
      author: "Emily Selman",
      avatarSrc:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    {
      id: 3,
      rating: 4,
      content: `
            <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
          `,
      author: "Emily Selman",
      avatarSrc:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    // More reviews...
  ],
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const ReviewList = () => {
  return (
    <div className="flow-root">
      <div className="-my-12 divide-y divide-gray-200">
        {reviews.featured.map((review) => (
          <div key={review.id} className="py-12">
            <div className="flex items-center">
              <img
                src={review.avatarSrc}
                alt={`${review.author}.`}
                className="h-12 w-12 rounded-full"
              />
              <div className="ml-4">
                <h4 className="text-sm font-bold text-gray-900">
                  {review.author}
                </h4>
                <div className="mt-1 flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        review.rating > rating
                          ? "text-yellow-400"
                          : "text-gray-300",
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{review.rating} out of 5 stars</p>
              </div>
            </div>

            <div
              className="mt-4 space-y-6 text-base italic text-gray-600"
              dangerouslySetInnerHTML={{ __html: review.content }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
