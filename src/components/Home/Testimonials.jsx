import React, { useState, useEffect, useRef } from 'react';

// --- SVG Icons (No Change) ---
const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);

const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
);

// --- Main Component ---
const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const scrollContainerRef = useRef(null);
    const intervalRef = useRef(null);
    const [isInteracting, setIsInteracting] = useState(false);

    // --- Data Fetching Effect (Updated for Google Sheets) ---
    useEffect(() => {
        const fetchTestimonials = async () => {
            // Ensure your .env.local file has these variables
            const apiKey = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
            const sheetId = import.meta.env.VITE_GOOGLE_SHEET_ID;
            const sheetName = import.meta.env.VITE_GOOGLE_SHEET_NAME_TESTIMONIAL; // Using a specific name for testimonials sheet
            const range = 'A:F'; // Columns A to F
            const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!${range}?key=${apiKey}`;
            
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch from Google Sheets. Check API Key, Sheet ID, and permissions.');
                }
                const data = await response.json();
                const rows = data.values || [];

                if (rows.length > 1) {
                    // Convert rows to an array of objects, skipping the header row (rows[0])
                    const formattedTestimonials = rows.slice(1).map(row => ({
                        // Assuming order: Timestamp, Id, Name, Course, Batch, Message
                        id: row[1],
                        name: row[2],
                        designation: row[3], // Using 'Course' as 'designation'
                        batch: row[4],
                        message: row[5],
                    })).filter(testimonial => testimonial.name && testimonial.message); // Filter out any empty rows
                    
                    setTestimonials(formattedTestimonials);
                } else {
                    setTestimonials([]); // Handle case where sheet is empty or has only headers
                }
            } catch (err) {
                setError(err.message);
                console.error("Fetch Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []); // Runs once on component mount

    // Helper to generate placeholder avatars from initials
    const generateAvatar = (name) => {
        if (!name) return 'https://placehold.co/100x100/EBF4FF/4A5568?text=?';
        const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2);
        return `https://placehold.co/100x100/EBF4FF/4A5568?text=${initials}`;
    };

    // Duplicate testimonials for a seamless loop, only if data exists
    const displayTestimonials = testimonials.length > 0 ? [...testimonials, ...testimonials] : [];
    const SCROLL_INTERVAL = 4000;

    // --- Carousel Logic (Largely Unchanged) ---
    const handleScrollAction = (scrollFunc) => {
        if (scrollContainerRef.current) {
            scrollFunc(scrollContainerRef.current);
        }
    };

    const startAutoScroll = () => {
        stopAutoScroll();
        if (testimonials.length <= 1) return; // Don't scroll if not enough items
        intervalRef.current = setInterval(() => {
            handleScrollAction(container => {
                const scrollAmount = container.querySelector('div').offsetWidth;
                container.scrollTo({
                    left: container.scrollLeft + scrollAmount,
                    behavior: 'smooth'
                });
            });
        }, SCROLL_INTERVAL);
    };

    const stopAutoScroll = () => {
        clearInterval(intervalRef.current);
    };

    const handleManualScroll = (direction) => {
        setIsInteracting(true);
        stopAutoScroll();
        handleScrollAction(container => {
            const scrollAmount = container.querySelector('div').offsetWidth;
            const newScrollLeft = direction === 'next'
                ? container.scrollLeft + scrollAmount
                : container.scrollLeft - scrollAmount;
            container.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
        });
        // Debounce restarting auto-scroll
        setTimeout(() => setIsInteracting(false), SCROLL_INTERVAL * 2); 
    };
    
    useEffect(() => {
        if (!isInteracting && testimonials.length > 1) {
            startAutoScroll();
        }
        return stopAutoScroll;
    }, [isInteracting, testimonials]);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container || testimonials.length <= 1) return;

        const handleScroll = () => {
            // Check if we've scrolled past the original set of items
            const midpoint = container.scrollWidth / 2;
            if (container.scrollLeft >= midpoint) {
                // Instantly jump back to the beginning without animation
                container.style.scrollBehavior = 'auto';
                container.scrollLeft = container.scrollLeft - midpoint;
                container.style.scrollBehavior = 'smooth';
            }
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [testimonials]);

    // --- Render Logic (Unchanged) ---
    if (loading) {
        return (
            <section id="testimonials" className="py-16 md:py-24 bg-gray-50 text-center">
                <h2 className="text-2xl font-semibold text-gray-700">Loading Testimonials...</h2>
            </section>
        );
    }

    if (error) {
        return (
            <section id="testimonials" className="py-16 md:py-24 bg-red-50 text-center">
                <h2 className="text-2xl font-semibold text-red-600">Error: Could not load testimonials.</h2>
                <p className="text-red-500 mt-2">{error}</p>
            </section>
        );
    }
    
    return (
        <section id="testimonials" className="py-16 md:py-24 bg-gray-50 font-sans">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* --- Header --- */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">What Our Students Say</h2>
                    <p className="text-gray-500 mt-2">Real stories from our successful alumni.</p>
                    <div className="w-24 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
                </div>

                {/* Show a message if there are no testimonials */}
                {testimonials.length === 0 ? (
                    <div className="text-center text-gray-500 text-lg">
                        <p>No testimonials have been added yet. Check back soon!</p>
                    </div>
                ) : (
                    <div className="relative max-w-5xl mx-auto">
                        <div
                            ref={scrollContainerRef}
                            className="flex overflow-x-auto scroll-smooth py-4 gap-6"
                            style={{ scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}
                            onMouseEnter={stopAutoScroll}
                            onMouseLeave={() => setIsInteracting(false)}
                        >
                            {displayTestimonials.map((testimonial, index) => (
                                <div key={index} className="flex-shrink-0 w-80 md:w-96 p-2">
                                    <div className="bg-white p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl h-full flex flex-col justify-between min-h-[280px] relative overflow-hidden">
                                        <div className="text-indigo-500 text-8xl absolute top-0 left-0 -mt-2 ml-2 opacity-10 font-serif select-none">“</div>
                                        <blockquote className="text-gray-600 italic text-base md:text-lg mb-6 relative z-10">
                                            "{testimonial.message}"
                                        </blockquote>
                                        <div className="flex items-center mt-4 relative z-10">
                                            <img src={generateAvatar(testimonial.name)} alt={testimonial.name} className="w-16 h-16 rounded-full mr-4 border-2 border-indigo-100" />
                                            <div className="text-left">
                                                <p className="font-bold text-gray-900 text-lg">{testimonial.name}</p>
                                                <p className="text-sm text-indigo-600 font-medium">{testimonial.designation} (Batch of {testimonial.batch})</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Navigation Buttons */}
                        {testimonials.length > 1 && (
                            <>
                                <button
                                    onClick={() => handleManualScroll('prev')}
                                    className="absolute top-1/2 -translate-y-1/2 -left-4 bg-white text-gray-700 p-3 rounded-full shadow-lg hover:bg-indigo-500 hover:text-white transition-all duration-300 z-20 hidden md:block"
                                    aria-label="Previous testimonial"
                                >
                                    <ChevronLeftIcon />
                                </button>
                                <button
                                    onClick={() => handleManualScroll('next')}
                                    className="absolute top-1/2 -translate-y-1/2 -right-4 bg-white text-gray-700 p-3 rounded-full shadow-lg hover:bg-indigo-500 hover:text-white transition-all duration-300 z-20 hidden md:block"
                                    aria-label="Next testimonial"
                                >
                                    <ChevronRightIcon />
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
             {/* Hide scrollbar */}
             <style>
                {`
                    .overflow-x-auto::-webkit-scrollbar {display: none;}
                `}
            </style>
        </section>
    );
};

export default Testimonials;