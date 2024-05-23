import BookSlider from "./Components/BooksSlider";
import BottomCard from "./Components/BottomCard";
import CardSection from "./Components/CardSection";
import CardSection2 from "./Components/CardSection2";
import Hero from "./Components/Hero";
import Testimonials from "./Components/Testimonials";

const Landing = () => {
  return (
    <div>
      <Hero />
      <CardSection />
      <CardSection2 />
      <BookSlider />
      <Testimonials />
      <BottomCard />
    </div>
  );
};

export default Landing;
