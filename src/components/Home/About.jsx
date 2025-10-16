import React from 'react';

const About = () => {
  // A brief description that will be shown on the main page.
  const shortText = "Welcome to Future Scope Computer Centre, Siliguri's premier institution for professional and technical training. Since our establishment in 2003, we have been dedicated to empowering individuals with the skills and knowledge necessary to thrive in an ever-evolving job market. Located in the heart of Haiderpara, we have built a legacy of excellence and have become a trusted name for quality education in the region. For over two decades, Future Scope has been a leader in the Computer Training Institutes sector. We began with a simple mission: to bridge the gap between academic education and industry demands. From our modest beginnings, we have grown into a state-of-the-art facility, committed to providing high-quality, hands-on training that delivers real-world results. ";

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">About Us</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>
        
        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <div>
            <img 
              src="./images/hero-background.jpg" 
              alt="A modern computer lab at Future Scope Computer Centre" 
              className="rounded-lg shadow-xl mx-auto w-full max-w-md lg:max-w-full"
              onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400?text=Image+Not+Found'; }}
            />
          </div>
          {/* Text Column */}
          <div className="text-center lg:text-left">
            <p className="text-gray-600 leading-relaxed mb-6">
              {shortText}
            </p>
            {/* This button is now a link that redirects to the full about page. */}
            <a 
              href="/about"
              className="mt-4 inline-block bg-transparent border-2 border-blue-600 text-blue-600 py-2 px-6 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              View More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

