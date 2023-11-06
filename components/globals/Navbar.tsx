import { Fragment, ReactNode, useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  ShoppingBagIcon,
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useCart } from "@/contexts/CartContext";
import LoginModal from "../ui-ux/authentication/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { ApiError, GlobalState } from "@/global-entities";
import { openLoginModal, setLogout } from "@/features/auth/authSlice";
import { useLogoutMutation } from "@/features/auth/apiAuth";
import { toast } from "react-toastify";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface NavLinkProps {
  href: string;
  children: ReactNode;
}

const Navbar = () => {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;
  const dispatch = useDispatch();
  const router = useRouter();
  const { setIsCartOpen, cartItems } = useCart();
  // const { open, setOpen } = useAuth();
  const isAuthenticated = useSelector(
    (state: GlobalState) => state.auth.isAuthenticated
  );
  const user = useSelector((state: GlobalState) => state.auth.user);
  const openModal = useSelector(
    (state: GlobalState) => state.auth.loginModalOpen
  );
  const [logout, { isLoading, isError, data, error }] = useLogoutMutation();

  // LOGGING OUT USER FROM BOTH FRONTEND AND BACKEND
  const onLogout = async () => {
    await logout({})
      .unwrap()
      .then(() => {
        // Successful logout.
        dispatch(setLogout());
        toast.success("Logout Successful!");

        // Redirect to home page.
        router.push("/");
      })
      .catch((rawError) => {
        const error = rawError as ApiError;
        console.error("Error during signup:", error);
        // Handle the error.
        const serverErrorMessage = error?.data?.error;
        const message = serverErrorMessage || "An unknown error occurred";

        // Update the local state with the error message.
        console.log("Server-side error during Logout", message);
        toast.error("Error during Logout. Please try again.");
      });
  };

  // PREPARING THE NAVLINK WITH ACTIVE LINK
  const NavLink = ({ href, children }: NavLinkProps) => {
    const isActive = router.pathname === href;

    return (
      <Link
        href={href}
        className={`text-white px-3 py-2 text-sm font-medium hover:bg-gray-700 hover:text-white ${
          isActive
            ? "border-b-4 border-indigo-500 text-gray-900"
            : "border-b-4 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
        }`}
      >
        {children}
      </Link>
    );
  };

  return (
    <>
      <LoginModal />
      <Disclosure as="nav" className="bg-gray-800">
        {(open) => (
          <>
            {/* DESKTOP MENU BAR */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between items-center">
                <div className="flex flex-grow">
                  {/* NAVBAR LOGO */}
                  <Link href="/">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-auto"
                        src="https://res.cloudinary.com/dyb0qa58h/image/upload/v1693536280/100x100_qot8lz.png"
                        alt="CyberizeGroup"
                      />
                    </div>
                  </Link>
                  {/* NAVBAR TEXT */}
                  <div className="flex-grow">
                    <div className="flex justify-between space-x-4">
                      <Link
                        href="/"
                        className="rounded-md bg-gray-900 px-3 py-2 text-lg font-large text-white"
                      >
                        Next.js (Redux)
                      </Link>
                      <nav className="hidden sm:ml-6 sm:flex flex-grow justify-center items-center">
                        <NavLink href="/blog">Blog</NavLink>
                        <NavLink href="/shop">Shop</NavLink>
                        <NavLink href="/template">Template</NavLink>
                        <NavLink href="/demo">Demo</NavLink>
                      </nav>
                    </div>
                  </div>
                </div>
                {/* MOBILE CART BUTTON */}
                <div className="sm:hidden mr-5">
                  <button
                    type="button"
                    className="relative inline-flex items-center p-2 text-sm font-medium text-center text-white bg-indigo-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => setIsCartOpen(true)}
                  >
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-200 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Notifications</span>
                    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
                      {cartItems.length}
                    </div>
                  </button>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex items-center">
                    {/* DESKTOP CART BUTTON */}
                    <button
                      type="button"
                      className="relative inline-flex items-center p-2 text-sm font-medium text-center text-white bg-indigo-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={() => setIsCartOpen(true)}
                    >
                      <ShoppingBagIcon
                        className="h-6 w-6 flex-shrink-0 text-gray-200 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Notifications</span>
                      <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
                        {cartItems.length}
                      </div>
                    </button>

                    {!isAuthenticated && (
                      <button
                        type="button"
                        className="relative inline-flex items-center p-2 text-sm font-medium text-center text-white bg-indigo-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-3"
                        onClick={() => dispatch(openLoginModal())}
                      >
                        Login
                      </button>
                    )}

                    {/* DESKTOP PROFILE DROPDOWN */}
                    {isAuthenticated && (
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            {user?.profileImage ? (
                              <img
                                alt="User Profile"
                                src={user.profileImage}
                                className="h-10 w-10 rounded-full"
                              />
                            ) : (
                              <UserCircleIcon
                                className="h-10 w-10 rounded-full"
                                color="white"
                              />
                            )}
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  href="/profile"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Your Profile
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Settings
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  onClick={onLogout}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Sign out
                                </a>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    )}
                  </div>
                </div>
                <div className="-mr-2 flex sm:hidden">
                  {/* MOBILE HAMBURGER BUTTON */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
            {/* MOBILE MENU */}
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                <Link href="/shop">
                  <Disclosure.Button
                    as="span"
                    className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
                  >
                    Shop
                  </Disclosure.Button>
                </Link>
                <Link href="/template">
                  <Disclosure.Button
                    as="span"
                    className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
                  >
                    Template
                  </Disclosure.Button>
                </Link>
                <Link href="/demo">
                  <Disclosure.Button
                    as="span"
                    className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
                  >
                    Demo
                  </Disclosure.Button>
                </Link>
              </div>
              <div className="border-t border-gray-700 pb-3 pt-4">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">
                      Tom Cook
                    </div>
                    <div className="text-sm font-medium text-gray-400">
                      tom@example.com
                    </div>
                  </div>
                  <button
                    type="button"
                    className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  <Disclosure.Button
                    as="a"
                    href="#"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    Your Profile
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    href="#"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    Settings
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    href="#"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    Sign out Mobile
                  </Disclosure.Button>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default Navbar;
