import NameSortForm from "@/components/forms/NameSortForm";
import SearchForm from "@/components/forms/SearchForm";
import { Page } from "@/components/globals";
import RestaurantList from "@/components/list-view/RestaurantList";
import SidebarDesktop from "@/components/ui-ux/SidebarDesktop";
import SidebarMobile from "@/components/ui-ux/SidebarMobile";
import {
  useGetRestaurantsQuery,
  useLazyGetRestaurantsQuery,
} from "@/features/restaurants/apiRestaurant";
import { setRestaurants } from "@/features/restaurants/restaurantSlice";
import { GlobalState } from "@/global-entities";
import { RestaurantApiResponse } from "@/services/restaurantService";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  initialRestaurants: RestaurantApiResponse;
  locationId: string;
  locationName: string;
}

const LocationPageContent = ({
  initialRestaurants,
  locationId,
  locationName,
}: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dispatch = useDispatch();
  const filters = useSelector((state: GlobalState) => state.restaurantFilters);

  const locationFilters = { ...filters, locationIds: [locationId] };

  const {
    data: restaurants,
    error: restaurantError,
    isLoading: restaurantIsLoading,
  } = useGetRestaurantsQuery(locationFilters);

  const [getRestaurants, { data, error, isLoading }] =
    useLazyGetRestaurantsQuery();
  const initialMount = useRef(true);

  useEffect(() => {
    dispatch(setRestaurants(initialRestaurants));
  }, [initialRestaurants, dispatch]);

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
    } else {
      getRestaurants(filters);
    }
  }, [filters, getRestaurants]);

  return (
    <>
      <Head>
        <title>Restaurants</title>
        <meta name="description" content="This is the demo page" />
      </Head>
      <Page FULL customYMargin="my-1" className="">
        <div className="flex">
          {/* MOBILE SIDEBAR WITH SLIDE ACTION */}
          <SidebarMobile
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />

          {/* DESKTOP SIDEBAR */}
          <div className="bg-gradient-to-r from-indigo-50 to-white">
            <SidebarDesktop />
          </div>

          {/* <div className="lg:pl-72"> */}
          <div className="mx-auto flex-grow">
            {/* <div className="sticky top-0 z-0 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"> */}
            <div className="top-0 z-0 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
              <button
                type="button"
                className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                {/* <Bars3Icon className="h-6 w-6" aria-hidden="true" /> */}
                <ChevronDoubleRightIcon
                  className="h-6 w-6"
                  aria-hidden="true"
                />
              </button>

              {/* Separator */}
              <div
                className="h-6 w-px bg-gray-900/10 lg:hidden"
                aria-hidden="true"
              />

              <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 justify-end">
                <SearchForm />

                <div className="flex items-center gap-x-4 lg:gap-x-6">
                  {/* Separator */}
                  <div
                    className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/20"
                    aria-hidden="true"
                  />
                  <NameSortForm />
                </div>
              </div>
            </div>

            <main className="pb-10 min-h-full">
              <div className="">
                {/* Your content */}
                {restaurants && (
                  <RestaurantList
                    title="Location Results For ..."
                    restaurants={restaurants}
                    searchTerm={locationName}
                  />
                )}
              </div>
            </main>
          </div>
        </div>
      </Page>
    </>
  );
};

export default LocationPageContent;
