import { Fragment } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Page } from "../globals";
import Head from "next/head";

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
      <Page FULL customYMargin="my-1" className="bg-gray-50">
        <div className="min-h-full">
          <Popover as="header" className="relative bg-indigo-600 py-24 z-0">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-center bg-cover"
              style={{
                backgroundImage:
                  "url(https://res.cloudinary.com/dyb0qa58h/image/upload/v1693553673/49981990_xtn8kc.webp)",
              }}
            ></div>
            {/* Header Content */}
            <div className="relative z-20 mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
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
                      Section title
                    </h2>
                    <div className="overflow-hidden rounded-lg bg-white shadow">
                      <div className="p-6">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Voluptates perspiciatis, dicta tempora reiciendis ab
                        nisi, porro incidunt delectus iure fugit consectetur
                        iusto. Sunt doloremque placeat distinctio illo tenetur
                        voluptate, obcaecati assumenda ea eum, numquam optio
                        dolor natus cumque! Itaque dicta provident quibusdam.
                        Aperiam ad ducimus, non molestiae impedit quisquam
                        ipsum, alias, cumque minima dolorum possimus? Eos,
                        laudantium asperiores enim obcaecati quis dolorum et
                        omnis eligendi sequi! Atque voluptatem quisquam cum
                        dolorem neque. Vel, dignissimos? Totam, veniam. Veniam
                        atque, minima velit quisquam libero provident aut nobis
                        aspernatur pariatur, dicta molestiae? Atque ipsa modi
                        eum ipsam eaque itaque, necessitatibus perspiciatis
                        maxime, nesciunt tenetur, dolor dolores esse beatae
                        illo. Tenetur labore sit inventore quis excepturi cumque
                        quos quibusdam totam! Alias suscipit facere harum quasi
                        aliquam! Totam eum possimus corporis mollitia autem
                        dolores voluptas ad, ab quibusdam repellat temporibus
                        perspiciatis quas porro? Animi doloribus corrupti atque
                        pariatur ex dolores quod mollitia enim, cumque, totam,
                        possimus nesciunt aut illum? Expedita recusandae sunt
                        pariatur nostrum, eum reiciendis accusantium et nam
                        excepturi molestias laborum ipsa. Eaque eligendi totam
                        repellendus consequatur, magnam optio laborum sit? Quae,
                        iure, adipisci porro consequuntur ducimus officiis
                        voluptatem veniam facere quidem necessitatibus,
                        dignissimos consequatur. Dolore repellendus natus
                        nostrum provident veniam reiciendis voluptatibus aut
                        sunt, quas minus inventore officia quos. Vitae incidunt
                        corrupti dignissimos, illum, voluptas provident neque
                        quas facilis obcaecati ea quo alias nam pariatur quia
                        nisi itaque. Assumenda nisi voluptates labore!
                        Laudantium sequi, neque quia consequuntur accusantium
                        beatae illum deserunt doloremque, ipsum, recusandae
                        velit eveniet repellat fuga quod molestias! Eum
                        accusamus temporibus ut doloribus architecto optio
                        placeat, non ad sint est quo consequatur? Excepturi,
                        labore! Perspiciatis rem a odit dignissimos animi.
                        Aliquam, eius quidem. Neque pariatur illum repellendus
                        cum natus ratione quasi libero suscipit sequi commodi,
                        inventore explicabo animi unde quisquam dolor quibusdam
                        voluptates illo minus eius ipsum rerum fugit quos.
                        Molestiae odio excepturi ut numquam necessitatibus
                        voluptates voluptas magnam placeat, totam consequatur
                        dolores, quasi illo quisquam dicta, perspiciatis
                        tempore. Voluptate beatae dolore vero? Dolorum ducimus
                        ex, repellendus sunt earum officia inventore blanditiis
                        illum fuga dicta enim esse totam beatae quis voluptas,
                        pariatur iste vel quasi aut eligendi hic dolores? Maxime
                        delectus quos, suscipit, cum, consectetur quaerat
                        asperiores sit aperiam ab repellendus harum est.
                        Voluptatem architecto, temporibus fugiat magni quas eos
                        ratione in atque itaque excepturi amet. Illo magnam
                        corporis hic distinctio doloribus temporibus est
                        explicabo sint, perferendis sapiente eius facere,
                        corrupti suscipit dolorem accusamus fugit quos quam ut
                        in mollitia similique incidunt commodi. Iusto,
                        distinctio? Accusamus illo repellat dolorum est,
                        deserunt, error possimus voluptatibus ipsam natus rerum
                        officia aut velit distinctio recusandae consectetur
                        adipisci doloremque explicabo nesciunt ea? Vel, nulla
                        cupiditate, ipsum aliquam incidunt sunt quae quidem
                        voluptatem molestias libero necessitatibus praesentium
                        omnis fugiat cum, aspernatur voluptas cumque nobis
                        ducimus placeat? Dolores sapiente earum ratione beatae
                        nihil commodi exercitationem similique soluta labore
                        totam quasi repellat deleniti eligendi veritatis rem
                        assumenda quibusdam, magnam sit doloremque? Ducimus
                        consectetur culpa labore quaerat beatae eaque optio
                        dolores autem in vel atque omnis pariatur numquam a
                        sequi, blanditiis saepe recusandae ea magni alias eum,
                        corrupti totam.
                      </div>
                    </div>
                  </section>
                </div>

                {/* Right column */}
                <div className="grid grid-cols-1 gap-4">
                  <section aria-labelledby="section-2-title">
                    <h2 className="sr-only" id="section-2-title">
                      Restaurant Info
                    </h2>
                    <div className="overflow-hidden rounded-lg bg-white shadow">
                      <div className="p-6">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Adipisci nisi, aliquam nostrum quibusdam molestias
                        animi unde quas possimus quisquam sapiente dolorum rem
                        labore ipsam officiis consectetur a. Soluta laborum
                        molestias assumenda excepturi sunt aut omnis facilis
                        cumque maiores aliquam, odit laboriosam unde officiis
                        corporis sed iure deleniti. Natus exercitationem nisi,
                        sit praesentium non quae aliquam nam quos cumque
                        deleniti culpa debitis incidunt obcaecati quod nihil
                        ratione odio adipisci. Sit cumque rem ducimus molestiae
                        ad doloribus dolore alias odit! Reprehenderit nobis,
                        nihil quos eum dolorum, iure incidunt similique hic,
                        possimus dolor aspernatur voluptatem voluptas dolore! Ut
                        eaque, eveniet, tempora nemo voluptate, facere vero quos
                        tenetur culpa provident rerum temporibus. Doloribus
                        corrupti ipsa temporibus, aspernatur voluptatum, nemo
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </main>
        </div>
      </Page>
    </>
  );
};

export default RestaurantSingleContent;
