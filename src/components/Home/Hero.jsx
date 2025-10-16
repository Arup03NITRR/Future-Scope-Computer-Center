import React from 'react';

const Hero = () => {
  const handleExploreClick = () => {
        window.location.href = '/courses';
    };
  return (
    <div 
      className="relative h-screen bg-cover bg-center flex items-center justify-center text-white"
      style={{ backgroundImage: "url('./images/hero-main.png')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
          FUTURE SCOPE COMPUTER CENTER
        </h1>
        <p className="font-serif italic text-3xl md:text-4xl text-blue-400 mb-8 max-w-2xl mx-auto">
          Ignite Your Potential...
        </p>
        <button 
          onClick={handleExploreClick}
          className="bg-blue-600 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          Explore Our Courses
        </button>
      </div>
    </div>
  );
};

export default Hero;