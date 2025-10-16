import React, { useState, useEffect, useMemo } from 'react';

// Define the category options for consistent filtering
const CATEGORY_OPTIONS = [
    { label: 'Classroom', value: 'Classroom' },
    { label: 'Events', value: 'Events' },
    { label: 'Facilities', value: 'Facilities' },
    { label: 'Others', value: 'Others' },
];

// --- HELPER FUNCTION for Google Drive URLs ---
const getEmbeddableGoogleDriveUrl = (shareUrl) => {
    if (!shareUrl || typeof shareUrl !== 'string') {
        return ''; 
    }
    
    let fileId = '';
    const parts = shareUrl.split('/d/');
    if (parts.length > 1) {
        fileId = parts[1].split('/')[0];
    } else if (shareUrl.includes('open?id=')) {
        fileId = shareUrl.split('id=')[1];
    }

    if (!fileId) {
        console.warn("Could not extract Google Drive File ID from URL:", shareUrl);
        return shareUrl;
    }

    return `https://drive.google.com/thumbnail?id=${fileId}`;
    //return `https://drive.google.com/uc?export=view&id=${fileId}`;
};

const Gallery = () => {
    const [filter, setFilter] = useState('All');
    const [allImages, setAllImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- NEW: Color mapping for category tags ---
    const categoryColorMap = useMemo(() => ({
        'Classroom': 'bg-green-100 text-green-800',
        'Events': 'bg-purple-100 text-purple-800',
        'Facilities': 'bg-yellow-100 text-yellow-800',
        'Others': 'bg-pink-100 text-pink-800',
    }), []);

    const categories = useMemo(() => {
        return ['All', ...CATEGORY_OPTIONS.map(c => c.value)];
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            console.error("Failed to parse date:", dateString);
            return 'Invalid Date';
        }
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    useEffect(() => {
        const fetchSheetData = async () => {
            setLoading(true);
            setError(null);

            const apiKey = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
            const sheetId = import.meta.env.VITE_GOOGLE_SHEET_ID;
            const sheetName = import.meta.env.VITE_GOOGLE_SHEET_NAME_GALLERY;
            const range = 'A:F';
            const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!${range}?key=${apiKey}`;

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok. Check Sheet ID, API Key, and share settings.');
                }
                const result = await response.json();
                
                if (!result.values || result.values.length < 2) {
                    setAllImages([]);
                    return;
                }
                
                const headers = result.values[0];
                const dataRows = result.values.slice(1);

                const formattedData = dataRows.map(row => {
                    return headers.reduce((acc, header, index) => {
                        acc[header.toLowerCase()] = row[index] || '';
                        return acc;
                    }, {});
                });
                
                const imagesWithEmbeddableUrls = formattedData.map(image => ({
                    ...image,
                    image: getEmbeddableGoogleDriveUrl(image.image)
                }));

                setAllImages(imagesWithEmbeddableUrls);

            } catch (err) {
                console.error('API Fetch Error:', err);
                setError('Failed to load gallery images. Please check the console for details.');
                setAllImages([]);
            } finally {
                setLoading(false);
            }
        };

        fetchSheetData();
    }, []);

    const filteredImages = useMemo(() => {
        if (filter === 'All') {
            return allImages;
        }
        return allImages.filter(image => image.category && image.category === filter);
    }, [allImages, filter]);

    if (loading) {
        return <div className="text-center py-40 text-xl font-semibold text-gray-600">Loading Gallery...</div>;
    }

    if (error) {
        return <div className="text-center py-40 text-xl font-semibold text-red-600">{error}</div>;
    }

    return (
        <section id="gallery" className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800">Our Gallery</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        A visual journey through our moments of learning, collaboration, and success.
                    </p>
                    <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
                </div>

                <div className="flex justify-center flex-wrap gap-4 mb-12">
                    {categories.map(category => (
                        <button 
                            key={category} 
                            onClick={() => setFilter(category)} 
                            className={`px-6 py-2 rounded-full font-semibold transition-colors duration-300 ${filter === category ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-blue-100'}`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredImages.length === 0 ? (
                        <div className="col-span-full text-center py-10 text-xl text-gray-500">
                            No images found in the "{filter}" category.
                        </div>
                    ) : (
                        filteredImages.map(image => (
                            <div key={image.id} className="group relative overflow-hidden rounded-lg shadow-xl bg-white border border-gray-100 transition-all duration-300 hover:shadow-2xl">
                                <img
                                    src={image.image}
                                    alt={image.caption}
                                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/CCCCCC/333333?text=Image+Not+Found'; }}
                                    className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="p-4">
                                    <p className="text-gray-800 font-semibold text-lg mb-1">{image.caption}</p>
                                    <div className="flex justify-between items-center text-sm text-gray-500">
                                        {/* --- MODIFIED: Dynamic color class for category tag --- */}
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColorMap[image.category] || 'bg-gray-100 text-gray-800'}`}>
                                            {image.category}
                                        </span>
                                        <span className="flex items-center">
                                            {formatDate(image.date)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default Gallery;