import qs from "qs";
import { NextApiRequest, NextApiResponse } from "next";
import { qsToStrapi } from "@/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const searchTerm = "world";

  // Example usage:
  const query = qs.stringify(
    {
      sort: ["name:desc"],
      // sort: ["name:asc"],

      fields: ["name", "price"],

      filters: {
        price: {
          $in: ["CHEAP", "EXPENSIVE"],
        },
      },

      // populate: {
      //   restaurants: {
      //     populate: ["photos", "location", "cuisines", "reviews"],
      //   },
      // },
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

// filters: {
//   $or: [
//     {
//       content: {
//         $containsi: "Nihad",
//       },
//     },
//     {
//       content: {
//         $containsi: "nimat",
//       },
//     },
//   ],
// }

// FILTER BY RELATED COLLECTION ID AND PULLING DEEP RELATIONS DATA
// const query = qs.stringify(
//   {
//     sort: ["id:asc"],

//     fields: [],

//     filters: {
//       id: {
//         $eq: 6,
//       },
//     },

//     populate: {
//       restaurants: {
//         populate: ["photos", "location", "cuisines", "reviews.user"],
//       },
//     },
//   }
