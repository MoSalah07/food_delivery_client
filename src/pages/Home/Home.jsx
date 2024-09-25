import { useState } from "react";
// Components
import Explore from "../../components/Home/Explore.jsx";
import Landing from "../../components/Home/Landing.jsx";
import FoodDisplay from "../../components/Home/food_display/FoodDisplay.jsx";
import AppDownload from "../../components/Home/app-download.jsx";

function Home() {
  const [category, setCategory] = useState("All");

  return (
    <section className="w-full container mx-auto pb-16">
      <Landing />
      <Explore category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload />
    </section>
  );
}

export default Home;
