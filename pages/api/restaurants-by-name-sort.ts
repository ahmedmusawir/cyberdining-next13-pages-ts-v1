import { NextApiRequest, NextApiResponse } from "next";
import datasource from "../../data-layer";

// Example:
// http://localhost:3000/api/post-by-slug?slug=next-js-expert

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { sortOrder } = req.query;

  if (!sortOrder || Array.isArray(sortOrder)) {
    res
      .status(400)
      .json({ message: "Sort Order is missing from the request." });
    return;
  }

  const data = await datasource?.getAllRestaurantsByNameSort(sortOrder);
  res.status(200).json(data);
}
