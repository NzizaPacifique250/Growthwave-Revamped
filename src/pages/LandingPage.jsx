import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import SocialProof from '../components/SocialProof.jsx';
import Problem from '../components/Problem.jsx';
import HowItWorks from '../components/HowItWorks.jsx';
import AudienceSplit from '../components/AudienceSplit.jsx';
import Traction from '../components/Traction.jsx';
import Academy from '../components/Academy.jsx';
import Testimonials from '../components/Testimonials.jsx';
import Roadmap from '../components/Roadmap.jsx';
import Team from '../components/Team.jsx';
import Investors from '../components/Investors.jsx';
import Contact from '../components/Contact.jsx';
import Footer from '../components/Footer.jsx';

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <Problem />
        <HowItWorks />
        <AudienceSplit />
        <Traction />
        <Academy />
        <Testimonials />
        <Roadmap />
        <Team />
        <Investors />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
