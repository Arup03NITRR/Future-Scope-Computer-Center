// src/pages/NoticeBoard.jsx

import React, { useState, useEffect } from 'react';

// Helper function to convert Google Drive share URLs to direct thumbnail URLs
const getEmbeddableGoogleDriveUrl = (shareUrl) => {
    if (!shareUrl || typeof shareUrl !== 'string') {
        return ''; 
    }
    
    // This regex handles multiple Google Drive URL formats robustly
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?id=)|docs\.google\.com\/(?:document|presentation|spreadsheets)\/d\/)([a-zA-Z0-9_-]{28,})/;
    const match = shareUrl.match(regex);
    
    if (match && match[1]) {
        const fileId = match[1];
        // Use the thumbnail endpoint for direct image display
        return `https://drive.google.com/thumbnail?id=${fileId}`;
    }

    // console.warn("Could not extract Google Drive File ID from URL:", shareUrl);
    return shareUrl; // Fallback to the original URL if ID extraction fails
};

// A helper component for a single notice item
const NoticeItem = ({ title, date, content, imageUrl, pdfUrl, isImportant, externalUrl }) => {
  const baseClasses = "bg-white p-6 rounded-lg shadow-md border hover:shadow-lg transition-all duration-300";
  const importantClasses = "border-indigo-500 border-l-4 shadow-indigo-100";
  const normalClasses = "border-gray-200";

  return (
    <div className={`${baseClasses} ${isImportant ? importantClasses : normalClasses}`}>
      <div className="flex justify-between items-start mb-3 gap-4">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <div className="flex flex-col items-end flex-shrink-0">
          <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {date}
          </span>
          {isImportant && (
            <span className="mt-2 text-xs font-bold text-white bg-indigo-500 px-2 py-1 rounded-full">
              IMPORTANT
            </span>
          )}
        </div>
      </div>
      
      {content && (
        <p className="text-gray-600 mb-4 whitespace-pre-wrap">{content}</p>
      )}

      {/* External URL is now placed here, displaying the raw URL */}
      {externalUrl && (
          <a
            href={externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mb-4 text-sm text-indigo-600 hover:text-indigo-800 font-medium break-all transition-colors duration-300"
          >
            {externalUrl}
          </a>
      )}
      
      {imageUrl && (
        <div className="my-4">
          <img
            src={imageUrl}
            alt={title}
            className="rounded-lg w-full max-h-80 object-contain bg-gray-100"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      )}
      
      {/* The PDF link remains at the bottom */}
      {pdfUrl && (
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-300"
        >
          📄 View Attached PDF
        </a>
      )}
    </div>
  );
};


const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotices = async () => {
      const apiKey = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
      const sheetId = import.meta.env.VITE_GOOGLE_SHEET_ID;
      const sheetName = import.meta.env.VITE_GOOGLE_SHEET_NAME_NOTICE; 
      const range = 'A:I'; 
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!${range}?key=${apiKey}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        const rows = data.values;

        if (!rows || rows.length <= 1) {
          setNotices([]);
          return;
        }

        const headers = rows[0].map(h => h.trim());
        const noticeData = rows.slice(1).map(row => {
          const imageUrlFromSheet = row[headers.indexOf('Image')] || '';
          const pdfUrlFromSheet = row[headers.indexOf('PDF')] || '';
          const externalUrlFromSheet = row[headers.indexOf('URL')] || '';
          
          return {
            title: row[headers.indexOf('Title')] || '',
            date: row[headers.indexOf('Date')] || '',
            content: row[headers.indexOf('Content')] || '',
            imageUrl: getEmbeddableGoogleDriveUrl(imageUrlFromSheet),
            pdfUrl: pdfUrlFromSheet,
            externalUrl: externalUrlFromSheet,
            isImportant: row[headers.indexOf('Important')] === 'Yes',
          };
        }).filter(notice => notice.title);

        noticeData.sort((a, b) => {
          if (a.isImportant !== b.isImportant) {
            return a.isImportant ? -1 : 1;
          }
          return new Date(b.date) - new Date(a.date);
        });

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

  // JSX for loading, error, and rendering remains unchanged
  if (loading) {
    return (
      <section id="notice-board" className="py-20 bg-gray-50 text-center">
        <p className="text-xl font-semibold text-gray-700 animate-pulse">Loading Notices...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section id="notice-board" className="py-20 bg-red-50 text-center">
        <div className="container mx-auto p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-red-600">Error</h2>
            <p className="text-red-500 mt-2">{error}</p>
          </div>
      </section>
    );
  }

  return (
    <section id="notice-board" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900">Notice Board</h2>
          <p className="mt-4 text-lg text-gray-600">Latest updates and announcements.</p>
        </div>
        
        <div className="space-y-8 max-w-4xl mx-auto">
          {notices.length > 0 ? (
            notices.map((notice, index) => (
              <NoticeItem key={index} {...notice} />
            ))
          ) : (
            <div className="text-center bg-white p-8 rounded-lg shadow-md">
                <p className="text-gray-500 font-semibold text-lg">No Notice Published</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NoticeBoard;