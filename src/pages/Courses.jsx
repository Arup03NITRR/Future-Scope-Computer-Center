import React, { useState, useEffect } from 'react';

// --- Helper Data & Components (No Changes Here) ---
// ... (All the SVG and metadata objects are the same)
const CodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
);
const OfficeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
);
const DesignIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
);
const AbacusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 14h.01M9 11h.01M12 11h.01M15 11h.01M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
);
const SchoolIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20" /></svg>
);
const categoryMetadata = {
    "Programming Language": {
        icon: <CodeIcon />,
        description: "From fundamentals to advanced concepts, master the art of coding and software development.",
        color: "indigo"
    },
    "Foundation & Office Tools": {
        icon: <OfficeIcon />,
        description: "Build a strong base in computer skills and boost your productivity with essential office software.",
        color: "green"
    },
    "Creative Designing": {
        icon: <DesignIcon />,
        description: "Unleash your creativity by learning the principles and tools of modern digital design.",
        color: "pink"
    },
    "Mental Arithmetic": {
        icon: <AbacusIcon />,
        description: "Sharpen your mind and enhance calculation speed with our specialized ABACUS program.",
        color: "yellow"
    },
    "Academic Support": {
        icon: <SchoolIcon />,
        description: "Get ahead in your studies with curriculum-aligned coaching for school subjects.",
        color: "red"
    }
};

const CourseDetailItem = ({ course }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <li className="bg-white/60 rounded-lg p-3 transition-all duration-300 shadow-sm">
        <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left font-semibold text-gray-800 focus:outline-none">
          <span>{course.name}</span>
          <svg className={`h-5 w-5 transform transition-transform duration-300 text-gray-600 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </button>
        {isOpen && (<div className="mt-2 text-sm text-gray-700 pr-2 pt-1 border-t border-gray-200">{course.description}</div>)}
      </li>
    );
};

// --- MODIFIED CourseCard Component ---
const CourseCard = ({ category }) => {
    const colorVariants = {
        indigo: 'from-indigo-50 to-indigo-100 border-indigo-200',
        green: 'from-green-50 to-green-100 border-green-200',
        pink: 'from-pink-50 to-pink-100 border-pink-200',
        yellow: 'from-yellow-50 to-yellow-100 border-yellow-200',
        red: 'from-red-50 to-red-100 border-red-200',
    };
    return (
        <div className={`bg-gradient-to-br ${colorVariants[category.color]} rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col border`}>
            <div className="flex items-center mb-4">{category.icon}<h3 className="text-xl font-bold text-gray-800 ml-4">{category.title}</h3></div>
            <p className="text-gray-600 mb-6 flex-grow">{category.description}</p>
            <div>
                {/* --- FIX: Conditionally render list or a message --- */}
                {category.courses && category.courses.length > 0 ? (
                    <ul className="space-y-2">
                        {category.courses.map(course => (<CourseDetailItem key={course.coursename} course={course} />))}
                    </ul>
                ) : (
                    <div className="bg-white/60 rounded-lg p-3 text-center text-sm text-gray-500">
                        No courses listed in this category yet.
                    </div>
                )}
            </div>
        </div>
    );
};


// --- Main Courses Page Component ---
const CoursesPage = () => {
    const [courseCategories, setCourseCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAndGroupCourses = async () => {
            try {
                // --- Part 1: Fetch and process data from the sheet (no changes here) ---
                const apiKey = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
                const sheetId = import.meta.env.VITE_GOOGLE_SHEET_ID;
                const sheetName = import.meta.env.VITE_GOOGLE_SHEET_NAME_COURSE;
                const range = 'A:F'; 
                const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!${range}?key=${apiKey}`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not successful.');
                }
                const result = await response.json();

                let flatCourses = [];
                if (result.values && result.values.length > 1) {
                    const headers = result.values[0].map(h => h.toLowerCase().replace(/\s+/g, ''));
                    const dataRows = result.values.slice(1);
                    const rawCourses = dataRows.map(row => {
                        return headers.reduce((acc, header, index) => {
                            acc[header] = row[index] || '';
                            return acc;
                        }, {});
                    });
                    flatCourses = rawCourses.map(course => ({
                        name: course.coursename,
                        description: course.shortdescription,
                        category: course.category,
                    }));
                }

                // --- FIX: Create a template of all categories first ---
                const allCategoriesTemplate = Object.keys(categoryMetadata).reduce((acc, categoryName) => {
                    acc[categoryName] = {
                        title: categoryName,
                        ...categoryMetadata[categoryName],
                        courses: [] // Start with an empty courses array
                    };
                    return acc;
                }, {});
                
                // --- FIX: Populate the template with the fetched courses ---
                const populatedCategories = flatCourses.reduce((acc, course) => {
                    if (acc[course.category]) {
                        acc[course.category].courses.push(course);
                    }
                    return acc;
                }, allCategoriesTemplate); // Use the template as the starting point

                setCourseCategories(Object.values(populatedCategories));

            } catch (err) {
                setError('Failed to load courses. Please check the Sheet setup and sharing permissions.');
                console.error("Fetch Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAndGroupCourses();
    }, []);

    // ... (Loading, Error, and JSX rendering parts remain the same)
    if (loading) {
        return <div className="flex justify-center items-center min-h-screen"><p className="text-2xl font-semibold text-gray-600">Loading Courses...</p></div>;
    }

    if (error) {
        return <div className="flex justify-center items-center min-h-screen"><p className="text-2xl font-semibold text-red-600">{error}</p></div>;
    }

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            <div className="container mx-auto px-4 py-12">
                <header className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-gray-800 mb-2">Future Scope Computer Centre</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Your trusted partner in computer education since 2003. We started with core computer courses and later expanded to include ABACUS to foster young minds.</p>
                </header>

                <main>
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-700">Explore Our Categories</h2>
                        <p className="text-md text-gray-500 mt-1">Click on any course name to see more details.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courseCategories.map(category => (
                            <CourseCard key={category.title} category={category} />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CoursesPage;