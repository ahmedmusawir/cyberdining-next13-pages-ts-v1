import { StarIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Pagination from "./Pagination";

const posts = [
  {
    id: 1,
    title: "Cyberize Dining",
    slug: "cyberize-dining",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel iusto corrupti dicta laboris incididunt.",
    imageUrl:
      "https://res.cloudinary.com/dyb0qa58h/image/upload/v1693554590/50980245_u9y9ro.webp",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Fine Dining", href: "#" },
  },
  {
    id: 2,
    title: "Moose is Loose",
    slug: "moose-is-loose",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel iusto corrupti dicta laboris incididunt.",
    imageUrl:
      "https://res.cloudinary.com/dyb0qa58h/image/upload/v1693554590/51255426_zyfxwe.webp",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Asian", href: "#" },
  },
  {
    id: 3,
    title: "Star Bucks",
    slug: "star-bucks",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel iusto corrupti dicta laboris incididunt.",
    imageUrl:
      "https://res.cloudinary.com/dyb0qa58h/image/upload/v1693546208/cappuccino-croissant_bvzadp.webp",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Italian", href: "#" },
  },
  {
    id: 4,
    title: "Eat All You Can",
    slug: "eat-all-you-can",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel iusto corrupti dicta laboris incididunt.",
    imageUrl:
      "https://res.cloudinary.com/dyb0qa58h/image/upload/v1693550268/52663349_ssymlb.webp",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Chinese", href: "#" },
  },
  // More posts...
];

const review = 4;

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const onPageChange = () => {};

const RestaurantList = () => {
  return (
    <div className="bg-white py-4 sm:py-4">
      {/* <div className="w-full border-8 border-orange-500"> */}
      <div className="w-full">
        <div className="w-full text-center lg:text-left">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mt-5 px-5">
            Search results for ... stake
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600 px-5">
            Learn how to grow your business with our expert advice.
          </p>
          {/* For screens below 2xl, maintain the current layout */}
          <div className="mt-16 space-y-20 lg:mt-12 lg:space-y-20 2xl:space-y-0 2xl:grid 2xl:grid-cols-2 2xl:gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="relative isolate flex flex-col gap-8 lg:flex-row px-5 md:px-10"
              >
                <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
                  <Link href={`/restaurants/${post.slug}`}>
                    <img
                      src={post.imageUrl}
                      alt=""
                      className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
                    />
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                  </Link>
                </div>
                <div className="">
                  <div className="flex items-center gap-x-4 text-xs">
                    <span className="relative z-10 rounded-full bg-indigo-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                      {post.category.title}
                    </span>
                  </div>
                  <div className="group relative max-w-xl">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      {/* <span className="absolute inset-0" /> */}
                      <Link href={`/restaurants/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-5 text-sm leading-6 text-gray-600">
                      {post.description}
                    </p>
                  </div>
                  <div className="mt-6 border-t border-gray-900/5 pt-6">
                    <div className="relative flex items-center gap-x-4 justify-between">
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={classNames(
                              review > rating
                                ? "text-yellow-400"
                                : "text-gray-200",
                              "h-5 w-5 flex-shrink-0"
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <button
                        type="button"
                        className="rounded-full bg-red-600 px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <Pagination
            currentPage={1}
            totalPageCount={5}
            onPageChange={onPageChange}
            pageSize={4}
            totalItemCount={10}
          />
        </div>
      </div>
    </div>
  );
};

export default RestaurantList;
