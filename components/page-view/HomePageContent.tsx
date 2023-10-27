import { Container, Hero, Row } from "../ui-ux";
import FeaturedCities from "../ui-ux/FeaturedCities";
import FeaturedCuisines from "../ui-ux/FeaturedCuisines";
import FeaturedRestaurants from "../ui-ux/FeaturedRestaurants";

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
