import Hero from "./components/Hero";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import Accomplishments from "./components/Accomplishments";
import Courses from "./components/Courses";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Services />
      <Testimonials />
      <Accomplishments />
      <Courses />
    </div>
  );
}
