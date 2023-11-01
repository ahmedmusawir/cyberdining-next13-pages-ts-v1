import { setCurrentPage } from "@/features/restaurants/restaurantFilterSlice";
import { GlobalState } from "@/global-entities";
import { RestaurantApiResponse } from "@/services/restaurantService";
import { useDispatch, useSelector } from "react-redux";
import RestaurantBlock from "../ui-ux/RestaurantBlock";
import Pagination from "./Pagination";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  title: string;
  restaurants: RestaurantApiResponse;
}

const RestaurantList = ({ title, restaurants }: Props) => {
  const dispatch = useDispatch();
  const currentPage = useSelector(
    (state: GlobalState) => state.restaurantFilters.currentPage
  );
  const restaurantsPerPage = useSelector(
    (state: GlobalState) => state.restaurantFilters.restaurantsPerPage
  );

  const onPageChange = (newPage: number) => {
    window.scrollTo(0, 0);

    dispatch(setCurrentPage(newPage));
  };

  return (
    <div className="bg-white py-4 sm:py-4">
      <div className="w-full">
        <div className="w-full text-center lg:text-left">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mt-5 px-5">
            {title}
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600 px-5">
            Learn how to grow your business with our expert advice.
          </p>
          {/* For screens below 2xl, maintain the current layout */}
          <div className="mt-16 space-y-20 lg:mt-12 lg:space-y-20 2xl:space-y-0 2xl:grid 2xl:grid-cols-2 2xl:gap-8">
            {restaurants?.data.map((restaurant) => (
              <RestaurantBlock restaurant={restaurant} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPageCount={Math.ceil(
              restaurants?.meta?.pagination?.total / restaurantsPerPage
            )}
            onPageChange={onPageChange}
            pageSize={restaurantsPerPage}
            totalItemCount={restaurants?.meta?.pagination?.total}
          />
        </div>
      </div>
    </div>
  );
};

export default RestaurantList;
