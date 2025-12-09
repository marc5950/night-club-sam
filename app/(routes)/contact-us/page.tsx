import HeroSmall from "../../components/general/HeroSmall";
import ContactForm from "./components/ContactForm";

export const metadata = {
  title: "Night Club - Contact Us",
  description: "Get in touch with Night Club",
};

const contactUs = () => {
  return (
    <main>
      <HeroSmall title="Contact us" />
      <ContactForm />
    </main>
  );
};

export default contactUs;
