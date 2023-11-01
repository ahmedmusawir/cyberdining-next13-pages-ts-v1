import { Restaurant, RestaurantData } from "@/data-layer/restaurant-entities";
import { calculateReviewRatingAverage, generatePriceIcons } from "@/utils";
import { CursorArrowRaysIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import Stars from "./Stars";

interface Props {
  restaurant: RestaurantData;
}

const RestaurantBlock = ({ restaurant }: Props) => {
  const avgRating = calculateReviewRatingAverage(
    restaurant.attributes.reviews.data
  );
  const isFeatured = restaurant.attributes.isFeatured;

  return (
    <article
      key={restaurant.id}
      className="relative isolate flex flex-col gap-8 lg:flex-row px-5 md:px-10"
    >
      <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
        <Link href={`/restaurants/${restaurant.attributes.slug}`}>
          <img
            src={restaurant.attributes.bannerImage}
            alt=""
            className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
          />
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
        </Link>
      </div>
      <div className="">
        <div className="flex justify-between items-center gap-x-4 text-xs">
          <div>
            {restaurant.attributes.cuisines.data.map((cuisine) => (
              <span
                key={cuisine.id}
                className="relative z-10 rounded-full bg-purple-100 px-3 py-1.5 font-medium text-gray-600"
              >
                {cuisine.attributes.name}
              </span>
            ))}
          </div>
          <span className="rounded-full bg-gray-400 px-3 py-1.5 font-medium text-white">
            {restaurant.attributes.location.data?.attributes.name}
          </span>
        </div>
        <div className="group relative max-w-xl">
          <h3 className="mt-5 text-xl font-bold leading-6 text-indigo-500 group-hover:text-gray-600">
            {/* <span className="absolute inset-0" /> */}
            <Link href={`/restaurants/${restaurant.attributes.slug}`}>
              {restaurant.attributes.name}
            </Link>
          </h3>
          <p className="flex justify-between">
            {/* $ ICONS FOR DIFFERENT PRICE POINTS */}
            {generatePriceIcons(restaurant.attributes.price)}
            {/* FOR FEATURED RESTAURANTS */}
            {isFeatured && (
              <span className="rounded-full bg-white px-3 py-1.5 text-xs text-red-600 border-2 border-red-600">
                Featured
              </span>
            )}
          </p>
          <p className="mt-5 text-sm leading-6 text-gray-600">
            {restaurant.attributes.description}
          </p>
        </div>
        {restaurant.attributes.hasOnlineOrdering ? (
          <span className="text-xs flex -ml-2  pt-5">
            <CursorArrowRaysIcon className="h-6 w-6 text-gray-500" />{" "}
            <span className="mt-[.4rem] ml-1">Order Online</span>
          </span>
        ) : (
          ""
        )}
        <div className="mt-6 border-t border-gray-900/5">
          <div className="relative flex items-center gap-x-4 justify-between">
            <div className="flex items-center">
              <Stars rating={avgRating} />
            </div>
            <button
              type="button"
              className="rounded-full bg-red-600 px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 mt-2"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default RestaurantBlock;
