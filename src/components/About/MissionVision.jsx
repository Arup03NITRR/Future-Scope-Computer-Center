import React from 'react';
import { FaRegLightbulb } from 'react-icons/fa';
import { GiPodiumWinner } from "react-icons/gi";

const MissionVision = () => (
  <section className="bg-gray-50 py-20">
    <div className="container mx-auto px-6">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
         <div className="text-center md:text-left">
            <div className="flex justify-center md:justify-start items-center gap-4 mb-4">
              <FaRegLightbulb className="w-12 h-12 text-blue-600" />
              <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              To provide accessible, high-quality technical education that empowers individuals to achieve their professional goals and meet the demands of the global job market.
            </p>
         </div>
         <div className="text-center md:text-left">
            <div className="flex justify-center md:justify-start items-center gap-4 mb-4">
              <GiPodiumWinner className="w-12 h-12 text-blue-600" />
              <h3 className="text-2xl font-bold text-gray-800">Our Vision</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              To be the most trusted and premier institution for IT and vocational training in North Bengal, recognized for our innovative teaching and commitment to student success.
            </p>
         </div>
       </div>
    </div>
  </section>
);

export default MissionVision;