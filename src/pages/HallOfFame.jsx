import React, { useState, useEffect } from 'react';

const HallOfFame = () => {
  // State for storing data, loading status, and errors
  const [achievers, setAchievers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- HELPER FUNCTION TO CONVERT GOOGLE DRIVE URL ---
  const getEmbeddableGoogleDriveUrl = (shareUrl) => {
    if (!shareUrl || typeof shareUrl !== 'string') {
      return ''; 
    }
    
    let fileId = '';
    
    // Pattern 1: Standard share link format (docs.google.com/document/d/[FILE_ID]/edit)
    let match = shareUrl.match(/\/d\/([^/]+)/);
    if (match) {
      fileId = match[1];
    } 
    
    // Pattern 2: Export or direct link format (drive.google.com/open?id=[FILE_ID])
    if (!fileId) {
      match = shareUrl.match(/id=([^&]+)/);
      if (match) {
        fileId = match[1];
      }
    }

    if (!fileId) {
      console.warn("Could not extract Google Drive File ID from URL:", shareUrl);
      // Fallback for non-Drive URLs, just return the original URL
      return shareUrl;
    }

    // Use the reliable thumbnail endpoint for faster display
    return `https://drive.google.com/thumbnail?id=${fileId}`;
  };

  useEffect(() => {
    const fetchHallOfFame = async () => {
      // --- Google Sheets API Configuration ---
      const apiKey = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
      const sheetId = import.meta.env.VITE_GOOGLE_SHEET_ID;
      const sheetName = import.meta.env.VITE_GOOGLE_SHEET_NAME_HALLOFFAME; 
      const range = 'A:G'; 
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!${range}?key=${apiKey}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        // --- Data Transformation ---
        const headers = data.values[0];
        const rows = data.values.slice(1);

        const formattedData = rows.map(row => ({
          _id: row[headers.indexOf('Id')],
          name: row[headers.indexOf('Name')],
          // --- THIS IS THE MODIFIED PART ---
          // Convert the image URL using the helper function
          image: getEmbeddableGoogleDriveUrl(row[headers.indexOf('Image')]),
          designation: row[headers.indexOf('Achievement')],
          institute: row[headers.indexOf('Organization')],
          year: row[headers.indexOf('Batch')]
        }));
        
        setAchievers(formattedData);

      } catch (err) {
        setError('Failed to load success stories. Please try again later.');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHallOfFame();
  }, []); 

  // --- Conditional Rendering & JSX (No changes below this line) ---

  if (loading) {
    return (
      <section id="hall-of-fame" className="py-20 bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-700 animate-pulse">Loading Hall of Fame...</h2>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="hall-of-fame" className="py-20 bg-red-50 min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-red-600">Oops!</h2>
          <p className="text-red-500 mt-2">{error}</p>
        </div>
      </section>
    );
  }
  
  return (
    <section id="hall-of-fame" className="py-20 bg-gradient-to-br from-indigo-50 to-blue-100">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
            Our <span className="text-blue-600">Hall of Fame</span>
          </h1>
          <p className="mt-6 text-xl text-gray-700 max-w-2xl mx-auto">
            Celebrating the extraordinary achievements and success stories of our brightest alumni. Their dedication inspires us all.
          </p>
          <div className="w-24 h-1.5 bg-blue-500 mx-auto mt-8 rounded-full shadow-lg"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {achievers.map((achiever) => (
            <div
              key={achiever._id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden
                         transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl
                         border border-gray-100
                         flex flex-col"
            >
              <div className="relative">
                <img
                  src={achiever.image}
                  alt={achiever.name}
                  className="w-full h-64 object-cover object-center transform transition duration-500 hover:scale-105"
                  onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/CCCCCC/FFFFFF/png?text=Image+Not+Found' }}
                />
                <span className="absolute top-5 right-5 bg-blue-600 text-white text-md font-semibold py-1.5 px-4 rounded-full shadow-md">
                  Batch {achiever.year}
                </span>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <h3 className="text-3xl font-bold text-white leading-snug">{achiever.name}</h3>
                </div>
              </div>
              <div className="p-7 flex flex-col flex-grow">
                <p className="text-blue-600 font-semibold text-lg mb-1">{achiever.designation}</p>
                <p className="text-gray-700 text-base">{achiever.institute}</p>
                <div className="flex-grow"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HallOfFame;