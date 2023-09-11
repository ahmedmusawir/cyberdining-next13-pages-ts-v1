import { Fragment } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Page } from "../globals";
import Head from "next/head";
import Reviews from "../ui-ux/Reviews";
import TabbedContent from "../ui-ux/TabbedContent";
import BookingForm from "../forms/BookingForm";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Home", href: "#", current: true },
  { name: "Profile", href: "#", current: false },
  { name: "Resources", href: "#", current: false },
  { name: "Company Directory", href: "#", current: false },
  { name: "Openings", href: "#", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const RestaurantSingleContent = () => {
  return (
    <>
      <Head>
        <title>Restaurants</title>
        <meta name="description" content="This is the demo page" />
      </Head>
      <Page FULL customYMargin="my-1" className="bg-gray-50 -mt-1">
        <div className="min-h-full">
          <Popover as="header" className="relative bg-indigo-600 py-24 z-0">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-center bg-cover"
              style={{
                backgroundImage:
                  "url(https://res.cloudinary.com/dyb0qa58h/image/upload/v1693553673/49981990_xtn8kc.webp)",
              }}
            >
              <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            {/* Header Content */}
            <div className="relative z-20 mx-auto max-w-2xl text-center  -mt-12">
              <h2 className="font-bold tracking-tight text-white sm:text-4xl">
                Cyberize Cafe
              </h2>
            </div>
          </Popover>

          <main className="-mt-12 pb-8 z-30 relative">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <h1 className="sr-only">Page title</h1>
              {/* Main 3 column grid */}
              <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
                {/* Left column */}
                <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                  <section aria-labelledby="section-1-title">
                    <h2 className="sr-only" id="section-1-title">
                      Left Column
                    </h2>
                    {/* <div className="overflow-hidden rounded-lg bg-white shadow"> */}
                    <div className="rounded-lg bg-white shadow">
                      <div className="p-6">
                        <TabbedContent />
                      </div>
                    </div>
                  </section>
                </div>

                {/* Right column */}
                <div className="grid grid-cols-1 gap-4">
                  <section aria-labelledby="section-2-title">
                    <h2 className="sr-only" id="section-2-title">
                      Right Column
                    </h2>
                    <div className="overflow-hidden rounded-lg bg-white shadow">
                      <div className="p-6">
                        <BookingForm />
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </main>
          <Reviews />
        </div>
      </Page>
    </>
  );
};

export default RestaurantSingleContent;
