import Hero from "./components/Hero";
import { useEffect } from "react";
import { getStoredTokens } from "../../utils/storages";
import Navbar from "../../components/Navbar";

const Home = () => {
  useEffect(() => {
    getStoredTokens();
  }, []);
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
