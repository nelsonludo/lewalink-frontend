import Hero from "./components/Hero";
import Navbar from "../../components/Navbar";
import { useEffect } from "react";
import { getStoredTokens } from "../../utils/storages";

const Home = () => {

  useEffect(() => {getStoredTokens()},[]);
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
