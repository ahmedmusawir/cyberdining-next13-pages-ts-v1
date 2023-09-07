import { QrCodeIcon } from "@heroicons/react/24/outline";
import SidebarForm from "../forms/SidebarForm";

const navigation = [
  { name: "Search Results...", href: "#", icon: QrCodeIcon, current: true },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const SidebarNav = () => {
  return (
    <nav className="flex flex-1 flex-col">
      <ul role="list" className="flex flex-1 flex-col gap-y-7 mt-7">
        <li>
          <ul role="list" className="-mx-2 space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-500 text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-800",
                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                  )}
                >
                  <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                  {item.name}
                </a>
              </li>
            ))}
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
