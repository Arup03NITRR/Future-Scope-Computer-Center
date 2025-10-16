import React, { useState, useEffect } from 'react';

// ⚠️ Configuration using Vite Environment Variables
const apiKey = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
const sheetId = import.meta.env.VITE_GOOGLE_SHEET_ID;
const sheetName = import.meta.env.VITE_GOOGLE_SHEET_NAME_FACULTY || 'FacultyData'; 
const range = 'A:G'; // Columns: Timestamp, Id, Name, Qualification, Institute, Specialization, Image

// ===================================================================
// ✅ UPDATED & CORRECTED UTILITY FUNCTION
// This function now correctly converts various Google Drive URLs into a reliable embeddable format.
// ===================================================================
const getEmbeddableGoogleDriveUrl = (shareUrl) => {
    if (!shareUrl || typeof shareUrl !== 'string') {
        return ''; 
    }
    
    // This regex handles multiple Google Drive URL formats robustly
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?id=)|docs\.google\.com\/(?:document|presentation|spreadsheets)\/d\/)([a-zA-Z0-9_-]{28,})/;
    const match = shareUrl.match(regex);
    
    if (match && match[1]) {
        const fileId = match[1];
        // Use the reliable 'uc?export=view' endpoint for direct embedding
        return `https://drive.google.com/thumbnail?id=${fileId}`;
    }

    console.warn("Could not extract Google Drive File ID from URL:", shareUrl);
    return shareUrl; // Fallback to the original URL if ID extraction fails
};
// ===================================================================

const Faculties = () => {
    // Initialize state variables
    const [facultyData, setFacultyData] = useState([]); 
    const [isLoading, setIsLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchFaculties = async () => {
            const API_ENDPOINT = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!${range}?key=${apiKey}`; 

            if (!apiKey || !sheetId) {
                setError("Configuration Error: API Key or Sheet ID is missing. Check your .env file setup.");
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch(API_ENDPOINT);

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error.message || `HTTP error! status: ${response.status}`);
                }
                
                const result = await response.json();
                
                const values = result.values;
                if (!values || values.length < 2) { // Need at least a header and one data row
                    setFacultyData([]);
                    return;
                }

                const [headers, ...rows] = values;

                const structuredData = rows.map((row) => {
                    const faculty = {};
                    headers.forEach((header, index) => {
                        faculty[header] = row[index] || '';
                    });
                    return faculty;
                });
                
                setFacultyData(structuredData);
                
            } catch (err) {
                console.error("Could not fetch faculty data from Google Sheets API:", err);
                setError(`Failed to load mentor data: ${err.message || "Check API Key, Sheet ID, and sheet sharing permissions."}`); 
            } finally {
                setIsLoading(false);
            }
        };

        fetchFaculties();
    }, []); 

    // --- Conditional Rendering ---

    if (isLoading) {
        return (
            <section id="faculties" className="py-20 bg-gray-100 text-center">
                <p className="text-xl text-blue-600">Loading mentors from Google Sheet... 📊</p>
            </section>
        );
    }

    if (error) {
        return (
            <section id="faculties" className="py-20 bg-gray-100 text-center">
                <p className="text-xl text-red-500">Error: {error}</p>
            </section>
        );
    }

    if (facultyData.length === 0) {
        return (
            <section id="faculties" className="py-20 bg-gray-100 text-center">
                <p className="text-xl text-gray-600">No mentors currently available in the sheet.</p>
            </section>
        );
    }

    // --- Component Markup ---
    return (
        <section id="faculties" className="py-20 bg-gray-100">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-800">Meet Our Expert Mentors</h2>
                    <div className="w-24 h-1 bg-blue-600 mx-auto mt-4"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    
                    {facultyData.map((faculty, index) => {
                        // Process the Image URL using the updated function
                        const imageUrl = getEmbeddableGoogleDriveUrl(faculty.Image);
                        
                        return (
                            <div 
                                key={faculty.Id || `${faculty.Name}-${index}`} 
                                className="bg-white rounded-lg shadow-lg text-center overflow-hidden transform hover:-translate-y-2 transition-transform duration-300"
                            >
                                
                                <img 
                                    src={imageUrl} 
                                    alt={faculty.Name} 
                                    className="w-full h-56 object-cover" 
                                    onError={(e) => {
                                        console.error(`Image failed to load for ${faculty.Name}. URL used: ${imageUrl}`);
                                        e.currentTarget.onerror = null; 
                                        e.currentTarget.src = "https://via.placeholder.com/224x224?text=Image+Error"; 
                                        e.currentTarget.alt = `Image not available for ${faculty.Name}`;
                                    }}
                                />
                                
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800">{faculty.Name}</h3> 
                                    <p className="text-blue-600 mt-1">
                                        {faculty.Specialization || "Specialization N/A"}
                                    </p>
                                    {faculty.Qualification && (
                                        <p className="text-gray-500 text-sm">{faculty.Qualification}</p>
                                    )}
                                    {faculty.Institute && (
                                        <p className="text-gray-500 text-sm">{faculty.Institute}</p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Faculties;