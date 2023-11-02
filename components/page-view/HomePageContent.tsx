import { Container, Row } from "../ui-ux";
import Hero from "../ui-ux/home/Hero";
import FeaturedCities from "../ui-ux/home/FeaturedCities";
import FeaturedCuisines from "../ui-ux/home/FeaturedCuisines";
import FeaturedRestaurants from "../ui-ux/home/FeaturedRestaurants";

const HomePageContent = () => {
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
