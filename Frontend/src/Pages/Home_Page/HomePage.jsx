import { PageChanger } from "../../Components/PageChanger/PageChanger";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  return (
    <PageChanger>
      <Navbar />
      <Outlet />
      <Footer />
    </PageChanger>
  );
};

export default HomePage;
