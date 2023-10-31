import { MenuItem } from "@/data-layer/restaurant-entities";

interface Props {
  restaurantMenu: MenuItem[];
  onlineOrdreing: boolean;
}
const MenuList = ({ restaurantMenu, onlineOrdreing }: Props) => {
  // console.log("restaurantMenu in MenuList:", restaurantMenu);
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {restaurantMenu.map((item) => (
        <div
          key={item.name}
          className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
        >
          {/* <div className="flex-shrink-0">
            <img
              className="h-20 w-20 rounded-full"
              src={item.imageUrl}
              alt=""
            />
          </div> */}
          <div className="min-w-0 flex-1">
            <span className="absolute inset-0" aria-hidden="true" />
            <p className="text-sm font-medium text-gray-900">{item.name}</p>
            <p className="truncate text-sm text-gray-500">{item.price}</p>
            <p className="mt-5 text-xs">{item.description}</p>
          </div>
        </div>
      ))}
      {onlineOrdreing && (
        <div className="btn-holder">
          <button className="btn">Order Online</button>
        </div>
      )}
    </div>
  );
};

export default MenuList;
