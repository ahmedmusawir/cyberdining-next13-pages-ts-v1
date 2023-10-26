import { NextApiRequest, NextApiResponse } from "next";
import datasource from "../../data-layer";

// Example:
// http://localhost:3000/api/restaurants-by-search?searchTerm="atlanta"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { searchTerm } = req.query;

  if (!searchTerm || Array.isArray(searchTerm)) {
    res
      .status(400)
      .json({ message: "searchTerm is missing from the request." });
    return;
  }

  const data = await datasource?.getAllRestaurantsBySearchTerm(searchTerm);
  res.status(200).json(data);
}
