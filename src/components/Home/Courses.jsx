import React from 'react';
// Correctly import Link from react-router-dom for navigation
import { Link } from 'react-router-dom';

// --- SVG Icon Components ---
const CodeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
);
const OfficeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
);
const SchoolIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20" /></svg>
);
const AbacusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 14h.01M9 11h.01M12 11h.01M15 11h.01M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
);

// --- Static Data for Course Categories ---
const categoryMetadata = {
    "Programming Languages": {
        icon: <CodeIcon />,
        description: "From fundamentals to advanced concepts, master the art of coding and software development.",
        color: "indigo"
    },
    "Foundation & Office Tools": {
        icon: <OfficeIcon />,
        description: "Build a strong base in computer skills and boost your productivity with essential office software.",
        color: "green"
    },
    "Academic Support": {
        icon: <SchoolIcon />,
        description: "Get ahead in your studies with curriculum-aligned coaching for school subjects.",
        color: "red"
    },
    "Mental Arithmetic (ABACUS)": {
        icon: <AbacusIcon />,
        description: "Sharpen your mind and enhance calculation speed with our specialized ABACUS program.",
        color: "yellow"
    }
};

// --- Reusable Course Card Component ---
const CourseCategoryCard = ({ title, category }) => {
    return (
        <div className={`
            bg-white shadow-lg rounded-xl border-t-4 p-8 flex flex-col h-full
            hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 
            ${category.color === 'indigo' ? 'border-indigo-500' : 
              category.color === 'green' ? 'border-green-500' : 
              category.color === 'red' ? 'border-red-500' : 
              'border-yellow-500'}
        `}>
            <div className="mb-4">
                <div className={`p-3 inline-flex rounded-full ${
                    category.color === 'indigo' ? 'bg-indigo-100' : 
                    category.color === 'green' ? 'bg-green-100' : 
                    category.color === 'red' ? 'bg-red-100' : 
                    'bg-yellow-100'}`
                }>
                    {category.icon}
                </div>
            </div>
            <h3 className="text-2xl font-extrabold text-gray-900 mb-3">{title}</h3>
            <p className="text-gray-600 flex-grow text-base">{category.description}</p>
        </div>
    );
};

// --- Main Component to Display All Categories ---
const Courses = () => {
    const categories = Object.entries(categoryMetadata);

    return (
        <section className="bg-gray-50 min-h-screen py-20 font-sans">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <header className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        Explore Our Core Programs
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                        We offer specialized courses designed to build essential skills across technology, creativity, and foundational knowledge.
                    </p>
                    <div className="w-20 h-1 bg-blue-600 rounded-full mx-auto mt-6"></div>
                </header>

                <main>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-10">
                        {categories.map(([title, categoryData]) => {
                            // Create a URL-friendly slug from the title for the link
                            const categorySlug = title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
                            return (
                                <Link key={title} to={`/courses/${categorySlug}`}>
                                    <CourseCategoryCard title={title} category={categoryData} />
                                </Link>
                            );
                        })}
                    </div>
                </main>
                
                <div className="text-center mt-16">
                    <Link
                        to="/courses"
                        className="
                            inline-flex items-center justify-center 
                            px-8 py-3 border border-transparent text-base font-medium rounded-full 
                            text-white bg-blue-600 hover:bg-blue-700 
                            shadow-lg hover:shadow-xl transition duration-300 ease-in-out 
                            transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50
                        "
                    >
                        View All Courses
                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-3 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Courses;