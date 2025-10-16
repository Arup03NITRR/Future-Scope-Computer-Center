import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react'; // Using Lucide icon for date/time context

// --- HELPER FUNCTION for Google Drive URLs ---
// This function converts a standard Google Drive sharing URL into a direct thumbnail link for faster loading.
const getEmbeddableGoogleDriveUrl = (shareUrl) => {
    if (!shareUrl || typeof shareUrl !== 'string') {
        return ''; 
    }
    
    let fileId = '';
    
    // Pattern 1: Standard share link format (e.g., docs.google.com/document/d/[FILE_ID]/edit)
    let match = shareUrl.match(/\/d\/([^/]+)/);
    if (match) {
        fileId = match[1];
    } 
    
    // Pattern 2: Export or direct link format (e.g., drive.google.com/open?id=[FILE_ID])
    if (!fileId) {
        match = shareUrl.match(/id=([^&]+)/);
        if (match) {
            fileId = match[1];
        }
    }

    if (!fileId) {
        console.warn("Could not extract Google Drive File ID from URL:", shareUrl);
        // Fallback for non-Drive URLs or unrecognized formats
        return shareUrl;
    }

    // Use the reliable thumbnail endpoint for optimized image display
    return `https://drive.google.com/thumbnail?id=${fileId}`;
};

const Gallery = () => {
    // State to hold the 4 latest images
    const [images, setImages] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- Robust Date Formatting ---
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        
        const date = new Date(dateString);
        // Check if the date string is valid
        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }

        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    useEffect(() => {
        const fetchSheetData = async () => {
            setLoading(true);
            setError(null);

            // Use import.meta.env for Vite environments
            const apiKey = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
            const sheetId = import.meta.env.VITE_GOOGLE_SHEET_ID;
            const sheetName = import.meta.env.VITE_GOOGLE_SHEET_NAME_GALLERY || "Gallery"; // Default to "Gallery"
            const range = 'A:F'; // Assuming data is within these columns

            // Simple retry mechanism with exponential backoff for API calls
            const maxRetries = 3;
            let lastError = null;
            
            for (let i = 0; i < maxRetries; i++) {
                try {
                    // Check that environment variables are configured before fetching
                    if (!apiKey || !sheetId) {
                        throw new Error("Configuration Error: Google Sheets API Key or Sheet ID is missing. Please check your environment variables (VITE_...).");
                    }
                    
                    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!${range}?key=${apiKey}`;
                    
                    const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error(`Network response failed with status: ${response.status}. Check your Sheet ID, API Key, and share settings.`);
                    }
                    const result = await response.json();
                    
                    // Handle cases where the sheet is empty or has only a header row
                    if (!result.values || result.values.length < 2) {
                        setImages([]);
                        setLoading(false);
                        return; // Exit if no data
                    }
                    
                    const headers = result.values[0].map(h => h.toLowerCase().trim());
                    const dataRows = result.values.slice(1);
                    
                    // Map column headers to data for each row
                    const formattedData = dataRows.map((row, rowIndex) => {
                        return headers.reduce((acc, header, index) => {
                            // Assumes the sheet columns map to: date, image, caption, category, etc.
                            acc['id'] = acc['id'] || `row-${rowIndex + 1}`; 
                            acc[header] = row[index] || '';
                            return acc;
                        }, {});
                    });
                    
                    // Apply Google Drive URL transformation to the 'image' column
                    const imagesWithEmbeddableUrls = formattedData.map(image => ({
                        ...image,
                        // Assuming the image URL column is named 'image'
                        image: getEmbeddableGoogleDriveUrl(image.image)
                    }));

                    // 1. Sort by Date (newest first)
                    const sortedImages = imagesWithEmbeddableUrls.sort((a, b) => {
                        const dateA = Date.parse(a.date);
                        const dateB = Date.parse(b.date);
                        
                        // Robustly handle invalid or missing dates
                        if (isNaN(dateA) && isNaN(dateB)) return 0;
                        if (isNaN(dateA)) return 1; 
                        if (isNaN(dateB)) return -1;
                        
                        return dateB - dateA; // Descending sort
                    });
                    
                    // 2. Slice to get the first 4 (latest) images
                    const latestFourImages = sortedImages.slice(0, 4);

                    setImages(latestFourImages);
                    setLoading(false);
                    return; // Exit function on successful fetch
                
                } catch (err) {
                    console.error(`Attempt ${i + 1} failed:`, err);
                    lastError = err;
                    // Implement exponential backoff delay (1s, 2s, 4s...) before retrying
                    if (i < maxRetries - 1) {
                        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
                    }
                }
            }

            // If the loop completes without a successful fetch, set the final error
            setError(lastError ? lastError.message : 'Failed to load gallery images after multiple retries.');
            setLoading(false);
        };

        fetchSheetData();
    }, []); // Empty dependency array ensures this effect runs only once on mount

    // --- Loading State UI ---
    if (loading) {
        return (
            <section id="gallery" className="py-20 bg-gray-50 text-center">
                <div className="text-2xl font-semibold text-blue-600 animate-pulse">Loading Latest Gallery Images...</div>
            </section>
        );
    }

    // --- Error State UI ---
    if (error) {
        return (
            <section id="gallery" className="py-20 bg-red-50 text-center">
                <div className="text-xl font-semibold text-red-600 p-8 rounded-lg border border-red-300 mx-auto max-w-lg shadow-md">
                    <p>🚨 Data Loading Error</p>
                    <p className="mt-2 text-sm font-normal text-red-700">{error}</p>
                </div>
            </section>
        );
    }

    // --- Main Component Render ---
    return (
        <section id="gallery" className="py-20 bg-white shadow-inner">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-gray-900">Featured Moments</h2>
                    <p className="mt-2 text-lg text-gray-600">
                        The latest four images from our learning environment.
                    </p>
                    <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
                </div>
                
                {images.length > 0 ? (
                    // Responsive grid layout (1, 2, or 4 columns)
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {images.map(image => (
                            <div 
                                key={image.id} 
                                className="group relative overflow-hidden rounded-xl shadow-xl bg-white border border-gray-100 transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
                            >
                                {/* Image Container with a fixed aspect ratio for consistency */}
                                <div className="w-full aspect-square overflow-hidden">
                                    <img
                                        src={image.image}
                                        alt={image.caption || 'Gallery image'}
                                        onError={(e) => { 
                                            e.target.onerror = null; // Prevent infinite loop if placeholder fails
                                            e.target.src = 'https://placehold.co/600x600/CCCCCC/333333?text=Image+Missing'; 
                                        }}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-xl text-gray-500 py-16 bg-gray-100 rounded-lg">
                        No images available yet. Please check the Google Sheet configuration.
                    </p>
                )}

                <div className="text-center mt-16">
                    {/* Link to the full gallery page */}
                    <Link
                        to="/gallery"
                        className="inline-flex items-center bg-blue-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-700 shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        View All Gallery Images
                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Gallery;

