import { Review, Reviews } from "@/data-layer/restaurant-entities";
import { calculateReviewRatingAverage } from "@/utils";
import React from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

interface Props {
  reviews?: Reviews[];
  rating?: number;
}

const Stars = ({ reviews, rating }: Props) => {
  const reviewRating = rating || calculateReviewRatingAverage(reviews);
  const iconColor = "#f97c0b";

  const renderStars = (): JSX.Element[] => {
    const stars: JSX.Element[] = [];

    for (let i = 0; i < 5; i++) {
      const difference = parseFloat((reviewRating - i).toFixed(1));
      if (difference >= 1)
        stars.push(
          <BsStarFill
            key={`star_full_${i}`}
            className="w-4 h-4 mr-1"
            color={iconColor}
          />
        );
      else if (difference < 1 && difference > 0) {
        if (difference <= 0.2)
          stars.push(
            <BsStar
              key={`star_empty_${i}`}
              className="w-4 h-4 mr-1"
              color={iconColor}
            />
          );
        else if (difference > 0.2 && difference <= 0.6)
          stars.push(
            <BsStarHalf
              key={`star_half_${i}`}
              className="w-4 h-4 mr-1"
              color={iconColor}
            />
          );
        else
          stars.push(
            <BsStarFill
              key={`star_almost_full_${i}`}
              className="w-4 h-4 mr-1"
              color={iconColor}
            />
          );
      } else
        stars.push(
          <BsStar
            key={`star_empty_after_${i}`}
            className="w-4 h-4 mr-1"
            color={iconColor}
          />
        );
    }

    return stars;
  };

  return <div className="flex items-center">{renderStars()}</div>;
};

export default Stars;
