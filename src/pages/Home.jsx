import Hero from '../components/Home/Hero';
import About from '../components/Home/About';
import Courses from '../components/Home/Courses';
import Gallery from '../components/Home/Gallery';
import HallOfFame from '../components/Home/HallOfFame';
import Testimonials from '../components/Home/Testimonials';
import WhyJoinUs from '../components/Home/WhyJoinUs';
import NoticeBoard from '../components/Home/NoticeBoard';

function Home() {
  return (
    <div className="font-sans">
      <main>
        <Hero />
        <About />
        <NoticeBoard />
        <WhyJoinUs />
        <Courses />
        <Gallery />
        <HallOfFame />
        <Testimonials />
      </main>
    </div>
  );
}

export default Home;