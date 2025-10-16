// src/components/Home/NoticeBoard.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true); // Start with loading true
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotices = async () => {
      // Set loading to true at the start of fetch
      setLoading(true);
      const apiKey = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
      const sheetId = import.meta.env.VITE_GOOGLE_SHEET_ID;
      // Ensure you have a sheet named 'Notices' or update the name here
      const sheetName = import.meta.env.VITE_GOOGLE_SHEET_NAME_NOTICES || 'Notices';
      const range = 'A:E'; // Assuming columns are Title, Date, Content, ImageURL, PDFURL
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!${range}?key=${apiKey}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const rows = data.values;

        // If there are no rows or only a header row, set notices to empty and return
        if (!rows || rows.length <= 1) {
          setNotices([]);
          return;
        }

        const headers = rows[0].map(h => h.trim());
        const noticeData = rows
          .slice(1)
          .map(row => ({
            // Map data from sheet columns to object keys
            title: row[headers.indexOf('Title')] || null,
            date: row[headers.indexOf('Date')] || '',
            // You can include other fields if needed on the target page
            content: row[headers.indexOf('Content')] || '',
            imageUrl: row[headers.indexOf('ImageURL')] || '',
            pdfUrl: row[headers.indexOf('PDFURL')] || '',
          }))
          // Filter out any rows where the title is missing
          .filter(notice => notice.title);

        // Sort notices by date in descending order (newest first)
        noticeData.sort((a, b) => new Date(b.date) - new Date(a.date));

        setNotices(noticeData);
      } catch (err) {
        setError('Failed to load notices. Please check back later.');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  if (loading) {
    return (
      <section id="notice-board" className="py-20 bg-gray-50 text-center">
        <p className="text-xl font-semibold text-gray-700 animate-pulse">Loading Notices...</p>
      </section>
    );
  }

  if (error) {
    // You might want to show an error or render nothing. Here we show an error.
    return (
      <section id="notice-board" className="py-20 bg-red-50 text-center">
        <div className="container mx-auto p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-red-600">Error</h2>
          <p className="text-red-500 mt-2">{error}</p>
        </div>
      </section>
    );
  }

  // If there are no notices, render nothing (a blank section)
  if (notices.length === 0) {
    return null;
  }

  return (
    <section id="notice-board" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900">Notice Board</h2>
          <p className="mt-4 text-lg text-gray-600">Latest updates and announcements.</p>
        </div>

        <div className="max-w-4xl mx-auto">
            {/* List container */}
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg border border-gray-200">
                <ul className="space-y-4">
                    {/* Slice the array to get only the top 3 notices */}
                    {notices.slice(0, 3).map((notice, index) => (
                        <li 
                            key={index} 
                            className="pb-4 border-b border-gray-200 last:border-b-0"
                        >
                            <div className="flex justify-between items-center gap-4">
                                <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                                    {notice.title}
                                </h3>
                                <span className="text-sm font-medium text-gray-500 whitespace-nowrap bg-gray-100 px-2 py-1 rounded">
                                    {notice.date}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
          
            {/* "View More" button */}
            <div className="text-center mt-8">
                <Link
                    to="/notice"
                    className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                    View All Notices
                </Link>
            </div>
        </div>
      </div>
    </section>
  );
};

export default NoticeBoard;