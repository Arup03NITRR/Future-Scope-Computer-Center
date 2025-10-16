import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

// Renamed to better reflect its purpose as a preview on a main page
const HallOfFamePreview = () => {
  // State to hold achievers, loading status, and any potential error
  const [achievers, setAchievers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- HELPER FUNCTION TO CONVERT GOOGLE DRIVE URL ---
  const getEmbeddableGoogleDriveUrl = (shareUrl) => {
    if (!shareUrl || typeof shareUrl !== 'string') return '';
    
    let fileId = '';
    let match = shareUrl.match(/\/d\/([^/]+)/) || shareUrl.match(/id=([^&]+)/);
    
    if (match) {
      fileId = match[1];
    }

    if (!fileId) {
      console.warn("Could not extract Google Drive File ID from URL:", shareUrl);
      return shareUrl; // Fallback for non-Drive URLs
    }

    return `https://drive.google.com/thumbnail?id=${fileId}`;
  };

  useEffect(() => {
    const fetchLatestAchievers = async () => {
      // --- Google Sheets API Configuration ---
      const apiKey = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
      const sheetId = import.meta.env.VITE_GOOGLE_SHEET_ID;
      const sheetName = import.meta.env.VITE_GOOGLE_SHEET_NAME_HALLOFFAME; 
      const range = 'A:G'; // Ensure all required columns are fetched
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!${range}?key=${apiKey}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Data could not be fetched from Google Sheets.');
        }
        const data = await response.json();
        
        // --- Data Transformation ---
        const headers = data.values[0];
        const rows = data.values.slice(1);

        const allAchievers = rows.map(row => ({
          _id: row[headers.indexOf('Id')],
          name: row[headers.indexOf('Name')],
          image: getEmbeddableGoogleDriveUrl(row[headers.indexOf('Image')]),
          designation: row[headers.indexOf('Achievement')],
          institute: row[headers.indexOf('Organization')],
          year: row[headers.indexOf('Batch')]
        }));

        // 2. Sort the data in reverse chronological order (newest first)
        // Assuming the data in the sheet is added chronologically
        const sortedData = allAchievers.reverse();
        
        // 3. Take only the first 4 items from the sorted list
        const latestFour = sortedData.slice(0, 4);

        setAchievers(latestFour);

      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch Hall of Fame:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestAchievers();
  }, []); // Empty dependency array ensures this runs once on mount

  // --- Conditional Rendering & JSX (No changes below) ---

  if (loading) {
    return (
      <section id="halloffame" className="py-20 bg-white text-center">
        <h2 className="text-3xl font-bold text-gray-800 animate-pulse">Loading Hall of Fame...</h2>
      </section>
    );
  }

  if (error) {
    return (
      <section id="halloffame" className="py-20 bg-red-50 text-center">
        <h2 className="text-3xl font-bold text-red-600">Error: {error}</h2>
      </section>
    );
  }

  return (
    <section id="halloffame" className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Hall of Fame</h2>
        <p className="text-gray-600 mb-12">Celebrating the success of our bright students.</p>

        {achievers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievers.map((achiever) => (
              <div key={achiever._id} className="bg-white p-6 rounded-lg shadow-xl text-center transition-transform hover:-translate-y-2">
                <img
                  src={achiever.image}
                  alt={achiever.name}
                  className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-blue-200"
                  onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/128x128/CCCCCC/FFFFFF/png?text=Image' }}
                />
                <h3 className="text-xl font-bold text-gray-800">{achiever.name}</h3>
                <p className="text-blue-600 font-semibold">{achiever.designation}</p>
                <p className="text-gray-500">{achiever.institute}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-lg">No success stories to display yet. Check back soon!</p>
        )}

        <div className="mt-16">
          <Link
            to="/hall-of-fame"
            className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 hover:scale-105 hover:bg-blue-700 shadow-lg hover:shadow-xl"
          >
            View More Achievements
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HallOfFamePreview;