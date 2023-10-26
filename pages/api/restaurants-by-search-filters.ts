import { FiltersState } from "@/global-entities";
import { NextApiRequest, NextApiResponse } from "next";
import datasource from "../../data-layer";

// Example:
// http://localhost:3000/api/restaurants-by-search-filters?searchTerm="atlanta"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const searchFilterQuery: FiltersState = req.query as any;

  if (!searchFilterQuery || Array.isArray(searchFilterQuery)) {
    res
      .status(400)
      .json({ message: "searchTerm & Filters missing from the request." });
    return;
  }

  const data = await datasource?.getAllRestaurantsBySearchFilters(
    searchFilterQuery
  );
  res.status(200).json(data);
}
