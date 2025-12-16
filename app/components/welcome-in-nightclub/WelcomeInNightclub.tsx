import Title from "../general/Title";
import PhotoCard from "./PhotoCard";
import { FaGlassMartiniAlt, FaUtensils, FaMusic } from "react-icons/fa";

const WelcomeInNightclub = () => {
  return (
    <section className="py-8 px-4">
      <Title title="Welcome in NightClub" />
      <div className="flex flex-wrap justify-center gap-8 mt-12">
        <PhotoCard
          image="/content-img/thumb1.jpg"
          icon={<FaMusic />}
          title="Night Club"
          desc="Experience the best nightlife with world-class DJs and amazing vibes"
        />
        <PhotoCard
          image="/content-img/reastaurant_1.jpg"
          icon={<FaUtensils />}
          title="Restaurant"
          desc="Enjoy gourmet dining with an exquisite menu crafted by top chefs"
        />
        <PhotoCard
          image="/content-img/thumb2.jpg"
          icon={<FaGlassMartiniAlt />}
          title="Bar"
          desc="Sip on premium cocktails and drinks in our elegant bar lounge"
        />
      </div>
    </section>
  );
};

export default WelcomeInNightclub;
