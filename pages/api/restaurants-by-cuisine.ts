import { NextApiRequest, NextApiResponse } from "next";
import datasource from "../../data-layer";

// Example:
// http://localhost:3000/api/restaurants-by-cuisine?id=9

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const cuisineId = Number(id);

  if (!cuisineId || Array.isArray(cuisineId)) {
    res
      .status(400)
      .json({ message: "Cuisine ID is missing from the request." });
    return;
  }

  const data = await datasource?.getAllRestaurantsByCuisineId(cuisineId);
  res.status(200).json(data);
}
