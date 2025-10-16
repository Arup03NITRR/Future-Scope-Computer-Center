import React, { useState, useEffect } from "react";

const Founder = () => {
  // --- State management ---
  const [founderData, setFounderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Converts a Google Drive sharing URL into a direct embeddable image URL.
   * Handles formats like:
   * - https://drive.google.com/open?id=FILE_ID
   * - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
   * - https://drive.google.com/uc?id=FILE_ID
   */
  const getEmbeddableGoogleDriveUrl = (shareUrl) => {
    if (!shareUrl || typeof shareUrl !== "string") return "";

    // Clean any hidden characters or quotes
    const cleanUrl = shareUrl.trim().replace(/^"(.*)"$/, "$1");

    const regex = /(?:file\/d\/|open\?id=|uc\?id=)([a-zA-Z0-9_-]+)/;
    const match = cleanUrl.match(regex);

    if (match && match[1]) {
      return `https://drive.google.com/thumbnail?id=${match[1]}`;
    }

    // Return as-is if not recognized
    return cleanUrl;
  };

  useEffect(() => {
    const fetchFounder = async () => {
      const apiKey = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
      const sheetId = import.meta.env.VITE_GOOGLE_SHEET_ID;
      const sheetName = import.meta.env.VITE_GOOGLE_SHEET_NAME_MANAGEMENT;
      const range = "A:F";
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!${range}?key=${apiKey}`;

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        const headers = data.values[0];
        const founderRow = data.values[1];

        if (!founderRow) throw new Error("No founder data found in sheet.");

        // Extract and clean URL
        const rawImageUrl = (founderRow[headers.indexOf("Image")] || "").trim();
        const imageUrl = getEmbeddableGoogleDriveUrl(rawImageUrl);

        // Debug output — check these in browser console
        console.log("📷 Raw Image URL from Sheet:", rawImageUrl);
        console.log("✅ Converted Image URL:", imageUrl);

        const formattedData = {
          name: founderRow[headers.indexOf("Name")] || "Name Not Found",
          title: founderRow[headers.indexOf("Designation")] || "Title Not Found",
          image: imageUrl,
          message: founderRow[headers.indexOf("Message")] || "No message provided.",
        };

        setFounderData(formattedData);
      } catch (err) {
        setError("Failed to load founder data. Please try again later.");
        console.error("❌ Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFounder();
  }, []);

  // --- Conditional Rendering ---
  if (loading) {
    return (
      <section id="founder" className="py-20 text-center">
        <p className="text-xl font-semibold text-gray-700 animate-pulse">
          Loading Founder's Message...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section id="founder" className="py-20 bg-red-50 text-center">
        <div className="container mx-auto p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-red-600">Oops!</h2>
          <p className="text-red-500 mt-2">{error}</p>
        </div>
      </section>
    );
  }

  // --- Main UI ---
  return (
    <section id="founder" className="py-20">
      <div className="container mx-auto px-6">
        <div className="bg-white p-8 md:p-12 rounded-lg shadow-xl flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/3 text-center">
            <img
              src={founderData.image}
              alt={founderData.name}
              className="w-48 h-48 md:w-64 md:h-64 rounded-full mx-auto object-cover shadow-lg border-4 border-blue-500"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "https://placehold.co/256x256/CCCCCC/FFFFFF/png?text=Image+Missing";
              }}
            />
            <h3 className="mt-6 text-2xl font-bold text-gray-800">
              {founderData.name}
            </h3>
            <p className="text-blue-600 font-semibold">{founderData.title}</p>
          </div>

          <div className="md:w-2/3">
            <div className="text-4xl text-blue-200 font-serif">“</div>
            <p className="text-gray-600 italic text-lg -mt-4">
              {founderData.message}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Founder;
