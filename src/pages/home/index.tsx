import Hero from "./components/Hero";
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
