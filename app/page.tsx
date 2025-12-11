import Hero from "./components/sections/Hero";
import Services from "./components/sections/Services";
import Testimonials from "./components/sections/Testimonials";
import Accomplishments from "./components/sections/Accomplishments";
import Courses from "./components/sections/Courses";
import Appointment from "./components/sections/Appointment";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Services />
      <Testimonials />
      <Accomplishments />
      <Courses />
      <Appointment />
    </div>
  );
}
