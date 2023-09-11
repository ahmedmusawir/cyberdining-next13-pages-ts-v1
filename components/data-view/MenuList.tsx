const people = [
  {
    name: "Lobster Brisk",
    description:
      "(served medium rare) 200g wagyu patty, comte cheese, black garlic mayo, pickled shallot, porcini salt, charcoal bun",
    price: "$24.00",
    imageUrl:
      "https://res.cloudinary.com/dyb0qa58h/image/upload/v1693554591/52063145_ckcmhy.webp",
  },
  {
    name: "Al Pachino",
    description:
      "double beef, double cheese, double bacon, BBQ sauce, kewpie, pickles, red onion",
    price: "$34.00",
    imageUrl:
      "https://res.cloudinary.com/dyb0qa58h/image/upload/v1693550892/51727875_x3nqtd.webp",
  },
  {
    name: "Pizza Veggie Grande",
    description: "beef, cheese, pickles, onion, mustard, tomato sauce",
    price: "$29.00",
    imageUrl:
      "https://res.cloudinary.com/dyb0qa58h/image/upload/v1693554590/50980245_u9y9ro.webp",
  },
  {
    name: "Lama Stake",
    description:
      "beef, smoked bacon, cheese, tomato, lettuce, caramelised onion, pickles, pink sauce",
    price: "$44.00",
    imageUrl:
      "https://res.cloudinary.com/dyb0qa58h/image/upload/v1693546209/39483521_awhwaf.webp",
  },
  // More people...
];

const MenuList = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {people.map((person) => (
        <div
          key={person.name}
          className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
        >
          <div className="flex-shrink-0">
            <img
              className="h-20 w-20 rounded-full"
              src={person.imageUrl}
              alt=""
            />
          </div>
          <div className="min-w-0 flex-1">
            <span className="absolute inset-0" aria-hidden="true" />
            <p className="text-sm font-medium text-gray-900">{person.name}</p>
            <p className="truncate text-sm text-gray-500">{person.price}</p>
            <p className="mt-5 text-xs">{person.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuList;
