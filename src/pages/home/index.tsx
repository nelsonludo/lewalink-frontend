import Hero from "../../components/HomeComponents/hero";
import Navbar from "../../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <Hero />
      </div>

    </>
  );
};

export default Home;
