import { NextApiRequest, NextApiResponse } from "next";
import datasource from "../../data-layer";

// Example:
// http://localhost:3000/api/restaurants-by-location?id=1 // Atlanta

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const locationId = Number(id);

  if (!locationId || Array.isArray(locationId)) {
    res
      .status(400)
      .json({ message: "Location ID is missing from the request." });
    return;
  }

  const data = await datasource?.getAllRestaurantsByLocationId(locationId);
  res.status(200).json(data);
}
