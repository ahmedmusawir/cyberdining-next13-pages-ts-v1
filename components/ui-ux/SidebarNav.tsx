import { resetAll } from "@/features/restaurants/restaurantFilterSlice";
import { QrCodeIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import SidebarForm from "../forms/SidebarForm";

const SidebarNav = () => {
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(resetAll());
  };
  return (
    <nav className="flex flex-1 flex-col">
      <ul role="list" className="flex flex-1 flex-col gap-y-7 mt-7">
        <li>
          <ul role="list" className="-mx-2 space-y-1">
            <li>
              <button
                className="text-white bg-gray-600 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold w-full"
                onClick={handleReset}
              >
                <QrCodeIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
                Reset Results
              </button>
            </li>
          </ul>
        </li>
        <li>
          <SidebarForm />
        </li>
      </ul>
    </nav>
  );
};

export default SidebarNav;
