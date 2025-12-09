import Hero from "./components/Hero";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import Accomplishments from "./components/Accomplishments";
import Courses from "./components/Courses";
import Appointment from "./components/Appointment";

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
