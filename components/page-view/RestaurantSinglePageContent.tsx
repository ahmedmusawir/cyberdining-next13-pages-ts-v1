import { RestaurantData } from "@/data-layer/restaurant-entities";
import { Popover } from "@headlessui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import BookingForm from "../forms/BookingForm";
import { Page } from "../globals";
import Reviews from "../ui-ux/Reviews";
import Spinner from "../ui-ux/Spinner";
import TabbedContent from "../ui-ux/TabbedContent";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  restaurant: RestaurantData;
}

const RestaurantSinglePageContent = ({ restaurant }: Props) => {
  const router = useRouter();

  // Providing spinner while next.js generates static pages when fallback is true
  if (router.isFallback) {
    return <Spinner />;
  }

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
                  // "url(https://res.cloudinary.com/dyb0qa58h/image/upload/v1693553673/49981990_xtn8kc.webp)",
                  `url(${restaurant.attributes.bannerImage})`,
              }}
            >
              <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            {/* Header Content */}
            <div className="relative z-0 mx-auto max-w-2xl text-center  -mt-12">
              <h2 className="font-bold tracking-tight text-white sm:text-4xl">
                {restaurant.attributes.name}
              </h2>
            </div>
          </Popover>

          <main className="-mt-12 pb-8 z-30 relative">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <h1 className="sr-only">{restaurant.attributes.name}</h1>
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
                        <TabbedContent restaurant={restaurant} />
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

export default RestaurantSinglePageContent;
