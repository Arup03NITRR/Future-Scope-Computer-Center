import React from 'react';

import AboutHero from '../components/About/AboutHero';
import History from '../components/About/History';
import MissionVision from '../components/About/MissionVision';
import Founder from '../components/About/Founder';
import Faculties from '../components/About/Faculties';
import Facilities from '../components/About/Facilities';

const About = () => {
  return (
    <div className="bg-white">
      <AboutHero />
      <History />
      <MissionVision />
      <Founder />
      <Faculties />
      <Facilities />
    </div>
  );
};

export default About;