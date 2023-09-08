import { Fragment } from "react";
import {
  StarIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/20/solid";
import { Tab } from "@headlessui/react";
import ImageList from "../data-view/ImageList";

const faqs = [
  {
    question: "What format are these icons?",
    answer:
      "The icons are in SVG (Scalable Vector Graphic) format. They can be imported into your design tool of choice and used directly in code.",
  },
  {
    question: "Can I use the icons at different sizes?",
    answer:
      "Yes. The icons are drawn on a 24 x 24 pixel grid, but the icons can be scaled to different sizes as needed. We don't recommend going smaller than 20 x 20 or larger than 64 x 64 to retain legibility and visual balance.",
  },
  // More FAQs...
];
const license = {
  href: "#",
  summary:
    "For personal and professional use. You cannot resell or redistribute these icons in their original or modified state.",
  content: `
    <h4>Overview</h4>
    
    <p>For personal and professional use. You cannot resell or redistribute these icons in their original or modified state.</p>
    
    <ul role="list">
    <li>You\'re allowed to use the icons in unlimited projects.</li>
    <li>Attribution is not required to use the icons.</li>
    </ul>
    
    <h4>What you can do with it</h4>
    
    <ul role="list">
    <li>Use them freely in your personal and professional work.</li>
    <li>Make them your own. Change the colors to suit your project or brand.</li>
    </ul>
    
    <h4>What you can\'t do with it</h4>
    
    <ul role="list">
    <li>Don\'t be greedy. Selling or distributing these icons in their original or modified state is prohibited.</li>
    <li>Don\'t be evil. These icons cannot be used on websites or applications that promote illegal or immoral beliefs or activities.</li>
    </ul>
  `,
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const TabbedContent = () => {
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
            {/* <Tab
              className={({ selected }) =>
                classNames(
                  selected
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800",
                  "whitespace-nowrap border-b-2 py-6 text-sm font-medium"
                )
              }
            >
              License
            </Tab> */}
          </Tab.List>
        </div>
        <Tab.Panels as={Fragment}>
          <Tab.Panel className="-mb-10">
            <h3 className="sr-only">Overview</h3>

            <article className="flex flex-col items-start justify-between">
              <div className="">
                <div className="mt-8 flex items-center gap-x-4 text-xs">
                  <a
                    href="#"
                    className="relative z-10 rounded-full bg-purple-100 px-3 py-1.5 font-medium text-gray-800 hover:bg-gray-100"
                  >
                    Fine Dining
                  </a>
                  <a
                    href="#"
                    className="relative z-10 rounded-full bg-purple-100 px-3 py-1.5 font-medium text-gray-800 hover:bg-gray-100"
                  >
                    Bar / Lounge
                  </a>
                </div>
                <div className="group relative">
                  <h1 className="mt-3 font-semibold leading-6 text-gray-900 group-hover:text-gray-600 py-5">
                    Grand Hyatt Kuala Lumpur
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
                      123 Reviews
                    </div>
                  </div>

                  {/* <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600"> */}
                  <p className="text-sm leading-6 text-gray-600">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Minima debitis a blanditiis eveniet dolore quidem aperiam
                    laboriosam inventore magni neque aspernatur adipisci sunt
                    dolores deserunt, perferendis veritatis velit maiores vitae?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Minima debitis a blanditiis eveniet dolore quidem aperiam
                  </p>
                </div>
                <div className="mt-8 items-center  pb-12">
                  <div className="items-center">
                    <h4>Photos</h4>
                    <hr />
                    <ImageList />
                  </div>
                </div>
              </div>
            </article>
          </Tab.Panel>

          <Tab.Panel className="pt-10">
            <h3 className="sr-only">Menu</h3>

            <div
              className="prose prose-sm max-w-none text-gray-500"
              dangerouslySetInnerHTML={{ __html: license.content }}
            />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default TabbedContent;
