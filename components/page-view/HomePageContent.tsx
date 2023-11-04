import { Container, Row } from "../ui-ux";
import Hero from "../ui-ux/home/Hero";
import FeaturedCities from "../ui-ux/home/FeaturedCities";
import FeaturedCuisines from "../ui-ux/home/FeaturedCuisines";
import FeaturedRestaurants from "../ui-ux/home/FeaturedRestaurants";
import { useEffect } from "react";
import { resetAll } from "@/features/restaurants/restaurantFilterSlice";
import { useDispatch } from "react-redux";

const HomePageContent = () => {
  const dispatch = useDispatch();

  // Resetting all the filters to start fresh from the home page
  useEffect(() => {
    dispatch(resetAll());
  }, []);

  return (
    <Container FULL className="">
      <Hero />
      <Row>
        <FeaturedRestaurants />
      </Row>
      <Row>
        <FeaturedCuisines />
      </Row>
      <Row>
        <FeaturedCities />
      </Row>
    </Container>
  );
};

export default HomePageContent;
