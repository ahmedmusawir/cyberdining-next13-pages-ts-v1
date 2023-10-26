import qs from "qs";
import { NextApiRequest, NextApiResponse } from "next";
import { generateSearchFields, qsToStrapi } from "@/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cuisineId = 5;
  // const searchTerm = "world";
  // const searchTerm = "atlanta";
  const searchTerm = "taco";
  const isFeatured = true;
  const hasOnlineOrdering = true;
  const cuisineIdArray = ["8"]; // Indian & Mexican
  const locationIdArray = ["3", "1"]; // Atlanta & Marietta
  const fields = [
    "name",
    "description",
    "slug",
    "price",
    "menuItems.name",
    "menuItems.description",
    "location.name",
    "cuisines.name",
  ];

  const searchFields = searchTerm
    ? generateSearchFields(searchTerm, fields)
    : [];

  console.log("Search Fields", searchFields);

  // Get search results:
  const query = qs.stringify(
    {
      sort: ["id:asc"],

      fields: ["name", "isFeatured", "hasOnlineOrdering"],

      filters: {
        ...(isFeatured && { isFeatured: { $eq: true } }),
        ...(hasOnlineOrdering && { hasOnlineOrdering: { $eq: true } }),
        ...(cuisineIdArray.length && {
          cuisines: {
            id: { $in: cuisineIdArray.map((catId) => Number(catId)) }, // Converting id string to number
          },
        }),
        ...(locationIdArray.length && {
          location: {
            id: { $in: locationIdArray.map((catId) => Number(catId)) }, // Converting id string to number
          },
        }),

        $or: searchFields,
      },

      populate: ["location", "cuisines"],
      // populate: "*",
    },

    {
      encodeValuesOnly: true,
      // arrayFormat: "brackets", NEVER USE THIS
    }
  );

  try {
    // const data = await qsToStrapi(`/reviews?${query}`);
    const data = await qsToStrapi(`/restaurants?${query}`);
    console.log(data);

    res.status(200).json(data); // Send the actual data
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
}

// const query = qs.stringify(
//     {
//       populate: "*",
//     }

// const query = qs.stringify(
//     {
//         fields: ["name", "description"],
//         populate: ["location", "cuisines", "photos"],
//     }

// const query = qs.stringify(
//     {
//       fields: ["name", "price"],

//       filters: {
//         price: {
//           $eq: "EXPENSIVE",
//         },
//       },
//     }

// const query = qs.stringify(
//     {
//       fields: ["name", "price"],

//       filters: {
//         price: {
//           $eq: "EXPENSIVE",
//         },
//       },

//       populate: {
//         location: {
//           fields: ["name"],
//         },
//         cuisines: {
//           fields: ["name"],
//         },
//       },
//     }

// TEXT SEARCH - CHECK THE FULL QUERY

// const query = qs.stringify(
//   {
//     sort: ["id:asc"],

//     fields: [],

//     filters: {
//       $or: [
//         {
//           description: {
//             $containsi: searchTerm,
//           },
//         },
//         {
//           name: {
//             $containsi: searchTerm,
//           },
//         },
//         {
//           slug: {
//             $containsi: searchTerm,
//           },
//         },
//         {
//           price: {
//             $containsi: searchTerm,
//           },
//         },
//       ],
//     },

//     populate: "*",
//   },

//   {
//     encodeValuesOnly: true,
//     // arrayFormat: "brackets", // NEVER USE THIS, QUERY WILL NOT WORK IF YOU DO
//   }
// );

// BY RESTAURANT ID
// const query = qs.stringify(
//     {
//       fields: ["name", "price"],

//       filters: {
//         id: {
//           $eq: 3,
//         },
//       },

//       populate: {
//         location: {
//           fields: ["name"],
//         },
//         cuisines: {
//           fields: ["name"],
//         },
//         reviews: {
//           fields: ["content", "stars"],
//           populate: {
//             user: {
//               fields: ["username", "email"],
//             },
//           },
//         },
//       },
//     }

// BY CUISINE ID

// const query = qs.stringify(
//     {
//       fields: ["name", "price"],

//       filters: {
//         cuisines: {
//           id: {
//             $eq: 2,
//           },
//         },
//       },

//       populate: {
//         location: {
//           fields: ["name"],
//         },
//         cuisines: {
//           fields: ["name"],
//         },
//         reviews: {
//           fields: ["content", "stars"],
//           populate: {
//             user: {
//               fields: ["username", "email"],
//             },
//           },
//         },
//       },
//     }

// BY LOCATION ID AND NAME SORTING A TO Z
// const query = qs.stringify(
//     {
//       sort: ["name:asc"],

//       fields: ["name", "price"],

//       filters: {
//         location: {
//           id: {
//             $eq: 1,
//           },
//         },
//       },

//       populate: {
//         location: {
//           fields: ["name"],
//         },
//       },
//     }

// REVERSE SORTING
// const query = qs.stringify(
//     {
//       sort: ["name:desc"],

//       fields: ["name", "price"],

//       filters: {
//         location: {
//           id: {
//             $eq: 1,
//           },
//         },
//       }

// MULTI FILTERS
// const query = qs.stringify(
//     {
//       sort: ["name:desc"],

//       fields: ["name", "price"],

//       filters: {
//         price: {
//           $eq: "REGULAR",
//         },
//         location: {
//           id: {
//             $eq: 1,
//           },
//         },
//       }

// COMPLEX FILTERING W/ AND
// const query = qs.stringify({
//   sort: ["name:asc"],

//   fields: ["name", "price", "isFeatured", "hasOnlineOrdering"],

//   filters: {
//     $and: [
//       {
//         isFeatured: {
//           $eq: true,
//         },
//       },
//       {
//         hasOnlineOrdering: {
//           $eq: true,
//         },
//       },
//     ],
//     location: {
//       id: {
//         $eq: 1,
//       },
//     },
//   },
// });

// COMMENTS BY USER ID
// const query = qs.stringify(
//     {
//       sort: ["id:asc"],

//       fields: ["stars"],

//       filters: {
//         user: {
//           id: {
//             $eq: 2,
//           },
//         },
//       },

//       populate: {
//         restaurant: {
//           fields: ["name"],
//         },
//         user: {
//           fields: ["email"],
//         },
//       },
//     }

// NON-CASE SENSETIVE TEXT SEARCH
// const query = qs.stringify(
//     {
//       sort: ["id:asc"],

//       fields: [],

//       filters: {
//         $or: [
//           {
//             content: {
//               $containsi: "Nihad",
//             },
//           },
//           {
//             content: {
//               $containsi: "nimat",
//             },
//           },
//         ],
//       }
