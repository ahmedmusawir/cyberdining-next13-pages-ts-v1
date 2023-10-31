import { Fragment } from "react";
import {
  StarIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/20/solid";
import { Tab } from "@headlessui/react";
import ImageList from "../list-view/ImageList";
import MenuList from "../list-view/MenuList";
import { RestaurantData } from "@/data-layer/restaurant-entities";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  restaurant: RestaurantData;
}

const TabbedContent = ({ restaurant }: Props) => {
  const cuisinesArray = restaurant.attributes.cuisines.data;
  const location = restaurant.attributes.location.data.attributes.name;
  const restaurantName = restaurant.attributes.name;
  const restaurantDescription = restaurant.attributes.description;
  const restaurantPhotos = restaurant.attributes.photos;
  const totalReviews = restaurant.attributes.reviews.data.length;

  return (
    <div className="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
      <Tab.Group as="div">
        <div className="border-b border-gray-200">
          <Tab.List className="-mb-px flex space-x-8">
            <Tab
              className={({ selected }) =>
                classNames(
                  selected
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800",
                  "whitespace-nowrap border-b-2 py-6 text-sm font-medium"
                )
              }
            >
              Overview
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  selected
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800",
                  "whitespace-nowrap border-b-2 py-6 text-sm font-medium"
                )
              }
            >
              Menu
            </Tab>
          </Tab.List>
        </div>
        <Tab.Panels as={Fragment}>
          <Tab.Panel className="-mb-10">
            <h3 className="sr-only">Overview</h3>

            <article className="flex flex-col items-start justify-between">
              {/*  This div is keeping the photos block intact */}
              <div className="">
                <section className="flex justify-between">
                  <div className="mt-8 flex items-center gap-x-4 text-xs">
                    {cuisinesArray.length &&
                      cuisinesArray.map((cuisine) => (
                        <span className="relative z-1 rounded-full bg-purple-100 px-3 py-1.5 font-medium text-gray-800 hover:bg-gray-100">
                          {cuisine.attributes.name}
                        </span>
                      ))}
                  </div>
                  <span className="relative z-1 rounded-full bg-gray-600 px-3 py-1.5 font-medium text-white hover:bg-gray-100 mt-8">
                    {location}
                  </span>
                </section>
                <div className="group relative">
                  <h1 className="mt-3 font-semibold leading-6 text-gray-900 group-hover:text-gray-600 py-5">
                    {restaurantName}
                  </h1>
                  <hr className="" />
                  <div className="mt-8 items-center gap-x-4 flex  justify-between pb-10">
                    <div className="stars flex justify-start">
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={classNames(
                              5 > rating ? "text-yellow-400" : "text-gray-200",
                              "h-5 w-5 flex-shrink-0"
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <span className="p-2 bg-indigo-50 rounded-full ml-3">
                        4.5
                      </span>
                    </div>
                    <div className="flex justify-start">
                      <ChatBubbleBottomCenterTextIcon className="w-6 text-indigo-500 mr-3" />{" "}
                      {totalReviews} Reviews
                    </div>
                  </div>

                  {/* <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600"> */}
                  <p className="text-sm leading-6 text-gray-600">
                    {restaurantDescription}
                  </p>
                </div>
                <div className="mt-8 items-center  pb-12">
                  <div className="items-center">
                    <h4>Photos</h4>
                    <hr />
                    <ImageList photos={restaurantPhotos} />
                  </div>
                </div>
              </div>
            </article>
          </Tab.Panel>

          <Tab.Panel className="pt-10">
            <h3 className="sr-only">Menu</h3>

            <MenuList />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default TabbedContent;
