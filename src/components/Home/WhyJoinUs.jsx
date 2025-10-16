const whyJoinUsData = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    title: 'Experienced Faculties',
    description: 'Learn from seasoned industry professionals who are dedicated mentors, providing personalized guidance and practical insights.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: 'Hands-on Training',
    description: 'Our curriculum is built around practical, hands-on projects, ensuring you graduate with a strong portfolio and real-world skills.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Flexible Schedule',
    description: 'We offer flexible timings, including morning, evening, and weekend batches to fit your busy life without compromise.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: 'Professional Certification',
    description: 'Receive an industry-recognized certificate upon completion, validating your skills and giving you a competitive edge in the job market.',
  },
];

const WhyJoinUs = () => (
  <section id="whyus" className="py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Join Us?</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>
        <p className="mt-4 text-lg text-gray-600">
          We provide a learning environment designed to ensure your success.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {whyJoinUsData.map((item, index) => (
          <div key={index} className="bg-white p-8 rounded-xl shadow-lg transform hover:-translate-y-2 transition-transform duration-300 flex flex-col items-center text-center">
            <div className="flex-shrink-0 bg-blue-600 rounded-full p-4">
              {item.icon}
            </div>
            <h3 className="mt-6 text-xl font-bold text-gray-900">{item.title}</h3>
            <p className="mt-2 text-base text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);


export default  WhyJoinUs;
